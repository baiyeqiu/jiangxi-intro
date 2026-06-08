/**
 * 后端 API 请求模块
 * 项目中这样调用：import api from './api'
 */

const BASE = ""; // Netlify Functions 同域部署，无需跨域

const api = {
  // ==========================================
  // 密码验证
  // ==========================================
  async login(password) {
    const res = await fetch("/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    return res.json();
  },

  // ==========================================
  // 获取江西数据
  // ==========================================
  async getJiangxiData() {
    const res = await fetch("/api/jiangxi");
    return res.json();
  },

  // ==========================================
  // 获取访问统计
  // ==========================================
  async getVisitors() {
    const res = await fetch("/api/visitors");
    return res.json();
  },

  // ==========================================
  // 提交留言
  // ==========================================
  async submitContact(name, email, message) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    return res.json();
  },
};

export default api;
