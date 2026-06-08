import { Link } from "react-router-dom";
import { Mountain, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-jiangxi-green-dark text-white overflow-hidden">
      {/* 装饰背景 */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,98,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* 品牌信息 */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-jiangxi-gold to-jiangxi-gold/70 flex items-center justify-center">
                <span className="text-jiangxi-green-dark font-display font-bold text-xl">
                  赣
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">赣鄱大地</h3>
                <p className="text-sm text-white/60">发现江西之美</p>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              致力于传播江西的自然风光、人文历史与地方文化，
              让更多人了解这片充满魅力的红土地。
            </p>
          </div>

          {/* 快速导航 */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-5 text-jiangxi-gold">
              探索江西
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/scenery", label: "风光览胜", icon: Mountain },
                { to: "/cuisine", label: "赣味美食", icon: null },
                { to: "/culture", label: "人文底蕴", icon: null },
                { to: "/specialties", label: "地方特产", icon: null },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/70 hover:text-jiangxi-gold transition-colors inline-flex items-center gap-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 精选景点 */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-5 text-jiangxi-gold">
              热门目的地
            </h4>
            <ul className="space-y-3">
              {["庐山", "三清山", "龙虎山", "滕王阁", "婺源"].map(
                (name) => (
                  <li key={name}>
                    <Link
                      to="/scenery"
                      className="text-sm text-white/70 hover:text-jiangxi-gold transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 关于 */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-5 text-jiangxi-gold">
              关于我们
            </h4>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              我们是一群热爱江西的地域分享者，
              希望通过这个平台将江西的美丽与魅力传递给每一位访客。
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Heart size={14} className="text-jiangxi-red" />
              <span>用心讲述江西故事</span>
            </div>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} 赣鄱大地 · 用心发现江西之美
          </p>
          <p className="text-sm text-white/30">
            匠心之作 · 源于热爱
          </p>
        </div>
      </div>
    </footer>
  );
}
