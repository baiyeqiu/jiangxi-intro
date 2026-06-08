/**
 * 请求安全守卫 —— Netlify Edge Function
 * 在请求到达你的网站之前进行过滤和加密保护
 */
export default async (request, context) => {
  const url = new URL(request.url);
  const method = request.method;
  const userAgent = request.headers.get("user-agent") || "";
  const referer = request.headers.get("referer") || "";

  // ====================================
  // 1. 请求方法过滤
  // ====================================
  const apiPaths = ["/auth", "/api"];
  const isApiPath = apiPaths.some((p) => url.pathname.startsWith(p));
  const allowedMethods = isApiPath
    ? ["GET", "HEAD", "POST"]
    : ["GET", "HEAD"];

  if (!allowedMethods.includes(method)) {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // ====================================
  // 2. 恶意路径拦截
  // ====================================
  const blockedPaths = [
    "/wp-admin", "/admin", "/.env", "/config",
    "/phpmyadmin", "/.git", "/.svn", "/actuator",
    "/api/v1", "/graphql", "/.well-known/security.txt",
  ];
  for (const path of blockedPaths) {
    if (url.pathname.toLowerCase().includes(path)) {
      return new Response("Forbidden", {
        status: 403,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  // ====================================
  // 3. 恶意 User-Agent 拦截
  // ====================================
  const blockedAgents = [
    "sqlmap", "nikto", "nmap", "masscan", "zgrab",
    "gobuster", "dirbuster", "wfuzz", "burp", "acunetix",
  ];
  const uaLower = userAgent.toLowerCase();
  for (const agent of blockedAgents) {
    if (uaLower.includes(agent)) {
      context.log(`Blocked malicious UA: ${agent}`);
      return new Response("Forbidden", {
        status: 403,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  // ====================================
  // 4. 异常请求特征检测
  // ====================================
  // 空 User-Agent 或异常字符
  if (userAgent.length < 3 && !uaLower.includes("curl")) {
    return new Response("Forbidden", {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // SQL 注入 / XSS 特征
  const dangerousPatterns = [
    /(\bunion\b.*\bselect\b)/i,
    /(<script|%3Cscript)/i,
    /(javascript\s*:)/i,
    /(\bselect\b.*\bfrom\b)/i,
  ];
  const queryString = url.search;
  for (const pattern of dangerousPatterns) {
    if (pattern.test(queryString)) {
      context.log(`Blocked injection attempt: ${queryString}`);
      return new Response("Forbidden", {
        status: 403,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  // ====================================
  // 5. 正常请求放行 + 添加安全头
  // ====================================
  const response = await context.next();

  // 克隆响应并追加安全头
  const secureResponse = new Response(response.body, response);
  secureResponse.headers.set("X-Content-Type-Options", "nosniff");
  secureResponse.headers.set("X-Frame-Options", "DENY");
  secureResponse.headers.set("X-XSS-Protection", "1; mode=block");
  secureResponse.headers.set("Referrer-Policy", "no-referrer");
  secureResponse.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  return secureResponse;
};

// 边缘函数配置
export const config = {
  path: "/*",
  onError: "bypass", // 函数出错时让请求正常通过，不影响访问
};
