/**
 * 通用 API 接口 —— 后端请求示例
 * 访问地址：/.netlify/functions/api
 *
 * 支持的请求：
 *   GET  /api  → 返回接口列表
 *   POST /api  → 数据处理示例
 */

export default async (req) => {
  const url = new URL(req.url);
  // 兼容两种路径：直接访问 /.netlify/functions/api 或通过 /api 重写
  let path = url.pathname.replace("/.netlify/functions/api", "");
  // 也尝试去掉 /api 前缀（Netlify rewrite 可能保留原始路径）
  if (path === url.pathname) {
    path = url.pathname.replace(/^\/api/, "");
  }
  const method = req.method;

  // ==========================================
  // GET /api → 接口列表
  // ==========================================
  if (method === "GET" && path === "") {
    return new Response(
      JSON.stringify({
        name: "江西介绍网站 API",
        version: "1.0",
        endpoints: {
          "/auth": { method: "POST", desc: "密码验证，body: { password }" },
          "/api": { method: "GET", desc: "接口列表" },
          "/api/visitors": { method: "GET", desc: "访问统计" },
          "/api/jiangxi": { method: "GET", desc: "江西数据" },
          "/api/contact": { method: "POST", desc: "提交留言" },
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  // ==========================================
  // GET /api/visitors → 访问统计
  // ==========================================
  if (method === "GET" && path === "/visitors") {
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          today: Math.floor(Math.random() * 100) + 50,
          total: Math.floor(Math.random() * 10000) + 5000,
          online: Math.floor(Math.random() * 20) + 1,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  // ==========================================
  // GET /api/jiangxi → 江西数据
  // ==========================================
  if (method === "GET" && path === "/jiangxi") {
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          capital: "南昌",
          population: "4518万",
          area: "16.69万平方公里",
          cities: [
            "南昌", "九江", "景德镇", "萍乡", "新余",
            "鹰潭", "赣州", "吉安", "宜春", "抚州", "上饶",
          ],
          landmarks: ["庐山", "井冈山", "三清山", "龙虎山", "婺源", "滕王阁"],
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  // ==========================================
  // POST /api/contact → 接收留言
  // ==========================================
  if (method === "POST" && path === "/contact") {
    try {
      const body = await req.json();
      const { name, email, message } = body;

      // 验证输入
      if (!name || !message) {
        return new Response(
          JSON.stringify({ success: false, message: "姓名和留言不能为空" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // 实际项目中这里会保存到数据库
      console.log(`收到留言: ${name} (${email}): ${message}`);

      return new Response(
        JSON.stringify({ success: true, message: "留言已收到，谢谢！" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: "数据格式错误" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // ==========================================
  // OPTIONS → CORS 预检
  // ==========================================
  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // ==========================================
  // 404
  // ==========================================
  return new Response(
    JSON.stringify({ success: false, message: "接口不存在" }),
    { status: 404, headers: { "Content-Type": "application/json" } }
  );
};
