import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Landmark,
  BookOpen,
  Palette,
  PenTool,
  Drama,
  Flag,
  Award,
  Clock,
  ChevronRight,
  ScrollText,
  GraduationCap,
  Gem,
  Users,
  Sparkles,
} from "lucide-react";
import cultureData from "@/data/culture.json";

/* ────────── 类型定义 ────────── */
interface CultureItem {
  id: string;
  title: string;
  era: string;
  year: string;
  description: string;
  image: string;
  type: string;
}

/* ────────── 文化类型配色方案 ────────── */
const typeConfig: Record<
  string,
  {
    icon: React.ElementType;
    gradient: string;
    bgLight: string;
    borderColor: string;
    textColor: string;
  }
> = {
  历史沿革: {
    icon: ScrollText,
    gradient: "from-teal-600 to-emerald-700",
    bgLight: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-700",
  },
  书院文化: {
    icon: GraduationCap,
    gradient: "from-slate-600 to-blue-700",
    bgLight: "bg-slate-50",
    borderColor: "border-slate-200",
    textColor: "text-slate-700",
  },
  陶瓷文化: {
    icon: Gem,
    gradient: "from-amber-600 to-yellow-700",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
  },
  文人墨客: {
    icon: PenTool,
    gradient: "from-purple-600 to-violet-700",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
  },
  戏曲艺术: {
    icon: Drama,
    gradient: "from-rose-600 to-fuchsia-700",
    bgLight: "bg-rose-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-700",
  },
  红色文化: {
    icon: Flag,
    gradient: "from-red-600 to-red-800",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
  },
  非遗传承: {
    icon: Award,
    gradient: "from-orange-500 to-amber-600",
    bgLight: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
  },
};

/* ────────── 页头区域 (Page Header) ────────── */
function PageHeader() {
  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[700px] flex items-center justify-center overflow-hidden">
      {/* 背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ancient%20Chinese%20cultural%20heritage%20scene%2C%20traditional%20scrolls%20and%20calligraphy%2C%20ink%20painting%20style%2C%20warm%20sepia%20tones%2C%20classical%20Chinese%20architecture%20with%20bamboo%20and%20mist&image_size=landscape_16_9')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-jiangxi-green-dark/80 via-jiangxi-green-dark/60 to-jiangxi-green-dark/85" />
      </div>

      {/* 装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[8%] w-40 h-40 rounded-full bg-jiangxi-gold/10 blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-[20%] right-[10%] w-52 h-52 rounded-full bg-white/8 blur-3xl"
        />
        {/* 古风纹理装饰 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-white/[0.03]" />
      </div>

      {/* 内容 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-jiangxi-gold/30 text-white/90 text-sm mb-8"
          >
            <Landmark size={14} className="text-jiangxi-gold" />
            <span>千年文脉 · 赣鄱大地</span>
          </motion.div>

          {/* 主标题 */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
            人文底蕴
          </h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed font-light"
          >
            从豫章故郡到红色圣地，从白鹿洞书院到景德镇瓷都
            <br className="hidden sm:block" />
            两千余年文明薪火相传，铸就江西独特的人文精神
          </motion.p>

          {/* 装饰线 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-32 h-[2px] mx-auto bg-gradient-to-r from-transparent via-jiangxi-gold to-transparent"
          />

          {/* 统计信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            {[
              { value: cultureData.length, label: "文化印记" },
              { value: new Set(cultureData.map((item) => item.type)).size, label: "文化类别" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-jiangxi-gold">
                  {stat.value}
                </div>
                <div className="text-xs text-white/60 mt-1 tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f5f0e8] to-transparent" />
    </section>
  );
}

/* ────────── 时间轴节点组件 ────────── */
function TimelineNode({
  item,
  index,
  isInView,
}: {
  item: CultureItem;
  index: number;
  isInView: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className={`relative flex items-center gap-6 md:gap-10 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* 内容卡片 */}
      <div
        className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} text-left`}
      >
        <div
          className={`group relative rounded-2xl p-5 md:p-6 card-hover border transition-all duration-300 ${
            typeConfig[item.type]?.bgLight || "bg-gray-50"
          } ${typeConfig[item.type]?.borderColor || "border-gray-200"} hover:shadow-lg`}
        >
          {/* 年份标签 */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 ${
              isLeft ? "md:ml-auto" : ""
            }`}
            style={{
              background:
                `linear-gradient(135deg, ${(typeConfig[item.type]?.gradient || "from-gray-600 to-gray-700").split(" ")[0].replace("from-", "")}, ${(typeConfig[item.type]?.gradient || "from-gray-600 to-gray-700").split(" ")[1].replace("to-", "")})`,
              color: "white",
            }}
          >
            <Clock size={12} />
            <span>{item.year}</span>
            <span className="opacity-70">·</span>
            <span>{item.era}</span>
          </div>

          {/* 标题 */}
          <h3
            className={`font-display text-lg md:text-xl font-bold mb-2 ${
              typeConfig[item.type]?.textColor || "text-gray-800"
            }`}
          >
            {item.title}
          </h3>

          {/* 描述 */}
          <p className="text-sm text-jiangxi-ink-light leading-relaxed line-clamp-3">
            {item.description}
          </p>

          {/* 类型标签 */}
          <div
            className={`flex items-center gap-1.5 mt-3 text-xs ${
              typeConfig[item.type]?.textColor || "text-gray-500"
            } opacity-70 ${isLeft ? "md:justify-end" : ""}`}
          >
            {(() => {
              const Icon = typeConfig[item.type]?.icon || BookOpen;
              return <Icon size={12} />;
            })()}
            <span>{item.type}</span>
          </div>

          {/* 图片（可选） */}
          {item.image && (
            <div
              className={`mt-4 rounded-xl overflow-hidden h-32 md:h-40 relative ${
                isLeft ? "md:ml-0" : "mr-0"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
        </div>
      </div>

      {/* 时间轴中心点 */}
      <div className="relative flex-shrink-0 hidden md:flex flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-jiangxi-gold to-yellow-600 flex items-center justify-center shadow-lg shadow-jiangxi-gold/30 ring-4 ring-[#f5f0e8]"
        >
          <ChevronRight
            size={18}
            className={`${isLeft ? "rotate-0" : "rotate-180"} text-white`}
          />
        </motion.div>
      </div>

      {/* 移动端时间轴点 */}
      <div className="absolute left-0 top-6 -translate-x-1/2 md:hidden flex items-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-jiangxi-gold to-yellow-600 flex items-center justify-center shadow-md ring-3 ring-[#f5f0e8]"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
        </motion.div>
      </div>

      {/* 占位（保持左右对称） */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

/* ────────── 时间轴展示区 (Timeline) ────────── */
function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-container bg-white/50">
      <div className="container mx-auto">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="section-title">千年文脉</h2>
          <p className="section-subtitle">
            沿着时间长河，追溯江西文化的每一个重要足迹
          </p>
          <div className="ink-divider" />
        </motion.div>

        {/* 时间轴容器 */}
        <div className="relative max-w-5xl mx-auto pl-10 md:pl-0">
          {/* 中央竖线（桌面端） */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-jiangxi-gold via-jiangxi-green-light to-jiangxi-gold/30 rounded-full"
            />
          </div>

          {/* 中央竖线（移动端） */}
          <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-[2px]">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-jiangxi-gold via-jiangxi-green-light to-jiangxi-gold/30 rounded-full"
            />
          </div>

          {/* 时间轴节点列表 */}
          <div className="space-y-10 md:space-y-14">
            {cultureData.map((item, index) => (
              <TimelineNode
                key={item.id}
                item={item as CultureItem}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────── 文化专题板块 (Culture Topics) ────────── */
function CultureTopicsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // 按 type 分组
  const groupedByType = cultureData.reduce(
    (acc, item) => {
      const type = item.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(item as CultureItem);
      return acc;
    },
    {} as Record<string, CultureItem[]>
  );

  const types = Object.keys(groupedByType);

  return (
    <section ref={ref} className="section-container bg-ink-wash">
      <div className="container mx-auto">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">文化专题</h2>
          <p className="section-subtitle">
            七大文化领域，全方位展现江西深厚的人文底蕴
          </p>
          <div className="ink-divider" />
        </motion.div>

        {/* 文化专题卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {types.map((type, index) => {
            const config = typeConfig[type];
            const Icon = config?.icon || BookOpen;
            const items = groupedByType[type];

            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`relative rounded-2xl overflow-hidden card-hover border ${
                    config?.borderColor || "border-gray-200"
                  } ${config?.bgLight || "bg-gray-50"} h-full`}
                >
                  {/* 顶部装饰条 */}
                  <div
                    className={`h-2 bg-gradient-to-r ${config?.gradient || "from-gray-600 to-gray-700"}`}
                  />

                  {/* 内容 */}
                  <div className="p-6 md:p-8">
                    {/* 图标与标题 */}
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config?.gradient || "from-gray-600 to-gray-700"} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon size={26} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <h3
                          className={`font-display text-xl font-bold ${config?.textColor || "text-gray-800"}`}
                        >
                          {type}
                        </h3>
                        <span className="text-xs text-jiangxi-ink-light mt-1 inline-block">
                          {items.length} 个条目
                        </span>
                      </div>
                    </div>

                    {/* 描述 - 取第一个条目的描述作为简介 */}
                    <p className="text-sm text-jiangxi-ink-light leading-relaxed line-clamp-3 mb-5">
                      {items[0]?.description}
                    </p>

                    {/* 条目预览列表 */}
                    <div className="space-y-2.5">
                      {items.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2.5 text-sm group/item"
                        >
                          <Sparkles
                            size={12}
                            className={`${
                              config?.textColor || "text-gray-400"
                            } opacity-50 group-hover/item:opacity-100 transition-opacity flex-shrink-0`}
                          />
                          <span className="text-jiangxi-ink truncate group-hover/item:text-jiangxi-green-dark transition-colors">
                            {item.title}
                          </span>
                        </div>
                      ))}
                      {items.length > 3 && (
                        <div className="text-xs text-jiangxi-ink-light/60 pl-5">
                          还有 {items.length - 3} 个更多...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 底部装饰 */}
                  <div
                    className={`absolute bottom-0 right-0 w-24 h-24 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity pointer-events-none`}
                  >
                    <Icon size={96} className={`${config?.textColor || "text-gray-400"}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════ Culture Page ════════════ */
export default function Culture() {
  return (
    <>
      <PageHeader />
      <TimelineSection />
      <CultureTopicsSection />
    </>
  );
}
