import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Mountain,
  UtensilsCrossed,
  Landmark,
  Package,
  ChevronDown,
  MapPin,
  Camera,
  Award,
  TreePine,
} from "lucide-react";
import sceneryData from "@/data/scenery.json";
import cuisineData from "@/data/cuisine.json";
import cultureData from "@/data/culture.json";
import specialtiesData from "@/data/specialties.json";

/* ────────── Hero Section ────────── */
function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* 背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Majestic%20Jiangxi%20mountain%20landscape%20with%20misty%20peaks%2C%20winding%20river%20through%20valley%2C%20traditional%20Chinese%20ink%20painting%20style%20background%2C%20ethereal%20clouds%20and%20green%20forests&image_size=landscape_16_9')",
        }}
      >
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      {/* 装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full bg-white/5 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 right-[15%] w-40 h-40 rounded-full bg-jiangxi-gold/8 blur-3xl"
        />
      </div>

      {/* 内容 */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* 徽章 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8"
          >
            <MapPin size={14} className="text-jiangxi-gold" />
            <span>中国 · 江西</span>
          </motion.div>

          {/* 主标题 */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-tight tracking-tight">
            <span className="block">赣鄱</span>
            <span className="block mt-2 bg-gradient-to-r from-jiangxi-gold via-yellow-200 to-jiangxi-gold bg-clip-text text-transparent">
              大地
            </span>
          </h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            千年瓷都的炉火未熄，红色圣地的星火燎原
            <br className="hidden sm:block" />
            庐山云雾间，遇见最美的中国山水
          </motion.p>

          {/* 按钮组 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/scenery" className="btn-capsule text-base px-8 py-4">
              <Mountain size={18} />
              开始探索
            </Link>
            <Link
              to="/culture"
              className="btn-capsule-outline border-white/40 text-white hover:bg-white hover:text-jiangxi-green-dark text-base px-8 py-4"
            >
              <Landmark size={18} />
              了解文化
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 向下滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs tracking-widest">向下探索</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ────────── Quick Navigation Cards ────────── */
function QuickNav() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const navCards = [
    {
      title: "风光览胜",
      desc: "名山大川与名胜古迹",
      icon: Mountain,
      path: "/scenery",
      color: "from-emerald-600/90 to-teal-700/90",
      image:
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Jiangxi%20mountains%20with%20misty%20peaks%20and%20green%20forests%2C%20dramatic%20Chinese%20landscape&image_size=landscape_16_9",
      count: `${sceneryData.length}+ 景点`,
    },
    {
      title: "赣味美食",
      desc: "舌尖上的江西味道",
      icon: UtensilsCrossed,
      path: "/cuisine",
      color: "from-orange-600/90 to-red-700/90",
      image:
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Delicious%20Jiangxi%20cuisine%20spread%20on%20table%2C%20traditional%20Chinese%20food%20with%20rich%20colors&image_size=landscape_16_9",
      count: `${cuisineData.length}+ 美食`,
    },
    {
      title: "人文底蕴",
      desc: "千年文脉与红色传承",
      icon: Landmark,
      path: "/culture",
      color: "from-amber-700/90 to-yellow-800/90",
      image:
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ancient%20Chinese%20academy%20library%20with%20scrolls%20and%20calligraphy%2C%20cultural%20heritage&image_size=landscape_16_9",
      count: `${cultureData.length}+ 故事`,
    },
    {
      title: "地方特产",
      desc: "江西好物带回家",
      icon: Package,
      path: "/specialties",
      color: "from-green-700/90 to-emerald-800/90",
      image:
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Jiangxi%20specialty%20products%20display%2C%20tea%20ceramics%20and%20local%20crafts%2C%20traditional%20goods&image_size=landscape_16_9",
      count: `${specialtiesData.length}+ 特产`,
    },
  ];

  return (
    <section ref={ref} className="section-container -mt-20 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {navCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.path}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <Link
                  to={card.path}
                  className="group relative block rounded-2xl overflow-hidden card-hover"
                >
                  {/* 背景图 */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${card.image}')` }}
                  />
                  {/* 渐变遮罩 */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${card.color}`}
                  />

                  {/* 内容 */}
                  <div className="relative z-10 p-6 md:p-7 min-h-[240px] flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-white/25 transition-colors">
                        <Icon size={22} className="text-white" />
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1.5">
                        {card.title}
                      </h3>
                      <p className="text-sm text-white/75">{card.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60 mt-4">
                      <Camera size={13} />
                      <span>{card.count}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ────────── Stats Section ────────── */
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: 14, suffix: "+", label: "国家5A级景区", icon: Mountain, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { value: 1700, suffix: "+", label: "年制瓷历史", icon: Award, color: "text-amber-600", bgColor: "bg-amber-50" },
    { value: 70, suffix: "+", label: "非遗项目", icon: Landmark, color: "text-red-600", bgColor: "bg-red-50" },
    { value: 63, suffix: "%", label: "森林覆盖率", icon: TreePine, color: "text-green-600", bgColor: "bg-green-50" },
  ];

  return (
    <section ref={ref} className="py-20 bg-white/60 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-center p-6 md:p-8 rounded-2xl ${stat.bgColor}`}
              >
                <Icon
                  size={28}
                  className={`${stat.color} mx-auto mb-3`}
                />
                <div
                  className={`font-display text-4xl md:text-5xl font-bold ${stat.color} mb-1`}
                >
                  <AnimatedCounter
                    target={stat.value}
                    isInView={isInView}
                    delay={index * 0.15}
                  />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-sm text-jiangxi-ink-light font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* Animated Counter Component */
function AnimatedCounter({ target, isInView, delay }: { target: number; isInView: boolean; delay: number }) {
  // 简化版：使用 CSS 动画效果
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {target}
    </motion.span>
  );
}

/* ────────── Featured Section ────────── */
function FeaturedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featuredItems = [
    {
      ...sceneryData[0],
      type: "景点",
      link: "/scenery",
    },
    {
      ...cuisineData[2],
      type: "美食",
      link: "/cuisine",
    },
    {
      ...cultureData[5],
      type: "文化",
      link: "/culture",
    },
    {
      ...specialtiesData[0],
      type: "特产",
      link: "/specialties",
    },
  ];

  return (
    <section ref={ref} className="section-container bg-ink-wash">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title">精选推荐</h2>
          <p className="section-subtitle">
            从山水到人文，从舌尖到匠心，精选江西最值得体验的内容
          </p>
          <div className="ink-divider" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featuredItems.slice(0, 2).map((item, index) => (
            <FeaturedCard key={item.id} item={item} index={index} isInView={isInView} large />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
          {featuredItems.slice(2).map((item, index) => (
            <FeaturedCard key={item.id} item={item} index={index + 2} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ item, index, isInView, large = false }: { item: Record<string, string | string[]>; index: number; isInView: boolean; large?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <Link
        to={item.link as string}
        className={`group relative block rounded-2xl overflow-hidden card-hover ${
          large ? "min-h-[320px]" : "min-h-[260px]"
        }`}
      >
        {/* 背景图 */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${item.image}')` }}
        />
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        {/* 内容 */}
        <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end">
          <span className="inline-flex self-start px-3 py-1 rounded-full bg-white/18 backdrop-blur-sm text-white/90 text-xs font-medium mb-3">
            {item.type}
          </span>
          <h3
            className={`font-display font-bold text-white mb-2 ${
              large ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            }`}
          >
            {item.name}
          </h3>
          <p className="text-sm text-white/70 line-clamp-2">{item.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

/* ════════════ Home Page ════════════ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickNav />
      <StatsSection />
      <FeaturedSection />
    </>
  );
}
