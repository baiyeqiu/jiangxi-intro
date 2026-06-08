/**
 * 密码验证 API —— 后端请求示例
 * 访问地址：/.netlify/functions/auth
 */
export default async (req) => {
  // 只允许 POST 请求
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "请使用 POST 请求" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const { password } = body;

    // === 密码验证（服务端，前端看不到）===
    // 修改密码只需改这里
    const CORRECT_PASSWORD = "12345678";

    if (password === CORRECT_PASSWORD) {
      // 生成简易 token（生产环境应用 JWT）
      const token = btoa(`auth:${Date.now()}:${Math.random()}`);

      return new Response(
        JSON.stringify({
          success: true,
          message: "验证通过",
          token: token,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `auth_token=${token}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Strict`,
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: "密码错误" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "请求格式错误" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
