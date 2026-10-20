// ============================================================
// 西昌学院 MPA 备考系统 —— 数据层
// 2026年12月19-20日全国硕士研究生招生考试（管理类联考）
// ============================================================

const EXAM = {
  name: "2026年12月全国硕士研究生招生考试（MPA·管理类联考）",
  date: "2026-12-19T08:30:00+08:00",
  dateText: "2026年12月19日—20日",
  notice: "报名：2026年10月15日—24日（每日9:00—22:00，研招网 yz.chsi.com.cn，逾期不得补办）；11月网上确认；考前10天左右可下载准考证。",
  subjects: [
    {
      name: "管理类综合能力（199）",
      score: "200分",
      time: "12月19日 上午 8:30—11:30",
      parts: "数学 75分（问题求解15题×3分 + 条件充分性判断10题×3分）· 逻辑推理 60分（30题×2分）· 写作 65分（论证有效性分析30分 + 论说文35分）",
      tips: "3小时30题数学+30题逻辑+2篇作文，平均每题不到2分钟。核心矛盾是时间：数学60-65min、逻辑50-55min、写作55-60min。"
    },
    {
      name: "英语二（204）",
      score: "100分",
      time: "12月19日 下午 14:00—17:00",
      parts: "完形填空 10分（20题×0.5）· 阅读50分（Part A 四篇20题×2分 + Part B 新题型10分）· 翻译15分（英译汉）· 小作文10分 + 大作文15分",
      tips: "英语二难度介于四六级之间。得阅读者得天下：阅读+新题型共60分，是拉分关键。"
    }
  ]
};

// 三阶段规划
const PHASES = [
  {
    name: "基础阶段",
    time: "2026年7月 — 9月30日",
    focus: "系统过一遍知识点（数学考点全覆盖、逻辑题型入门、英语核心词第一轮），配套基础习题，不求快但求懂。",
    status: "done"
  },
  {
    name: "强化阶段",
    time: "2026年10月1日 — 11月15日",
    focus: "分专题突破：数学四大模块逐一攻克，逻辑按题型总结套路，英语阅读精读+词汇二轮。建立并坚持记录错题本。",
    status: "active"
  },
  {
    name: "冲刺阶段",
    time: "2026年11月16日 — 12月18日",
    focus: "真题+全真模拟严格计时训练，写作模板成文定型，错题三轮清零，考前一周调整作息到考试节奏。",
    status: "upcoming"
  }
];

// 周计划（从10月20日到考前）
const WEEKS = [
  {
    id: "w1", name: "第1周", time: "10月20日 — 10月26日", phase: "强化",
    tasks: [
      "数学：算术+代数专题（均值不等式、二次函数、韦达定理），每日25题限时40min",
      "逻辑：形式逻辑翻译规则（如果/只有/除非），每日10题限时20min",
      "英语：核心词汇第1—40个（按本系统词表），每日2个长难句拆解",
      "【重要】完成研招网网上报名（10月24日截止，切勿拖延）"
    ]
  },
  {
    id: "w2", name: "第2周", time: "10月27日 — 11月2日", phase: "强化",
    tasks: [
      "数学：几何专题（平面几何+解析几何位置关系判断）",
      "逻辑：论证推理——削弱/加强题型套路",
      "英语：阅读精读隔日1篇（精读=逐句翻译+整理生词）",
      "本周错题全部录入错题本并复盘一轮"
    ]
  },
  {
    id: "w3", name: "第3周", time: "11月3日 — 11月9日", phase: "强化",
    tasks: [
      "数学：排列组合与概率专题（捆绑法/插空法/对立事件）",
      "逻辑：分析推理专项（排序、匹配、真假话）",
      "英语：完形填空技巧 + 阅读加量至每日2篇",
      "英语词汇第二轮过半"
    ]
  },
  {
    id: "w4", name: "第4周", time: "11月10日 — 11月15日", phase: "强化",
    tasks: [
      "数学：条件充分性判断专项 + 错题二轮",
      "逻辑：套题训练（30题限时55min）",
      "英语：翻译专项（每日1段英译汉）",
      "周末：管综真题第一套，严格计时3小时"
    ]
  },
  {
    id: "w5", name: "第5周", time: "11月16日 — 11月22日", phase: "冲刺",
    tasks: [
      "写作：论证有效性分析首篇（对照范文自批+互批）",
      "数学、英语错题二轮清零",
      "管综真题第二套（计时）+ 全卷复盘",
      "英语：小作文类型词句背诵（建议信/通知）"
    ]
  },
  {
    id: "w6", name: "第6周", time: "11月23日 — 11月29日", phase: "冲刺",
    tasks: [
      "写作：论说文两篇（审题立意训练+结构模板）",
      "英语：小作文仿写3篇 + 大作文图表描述句型",
      "管综真题第三套 + 错题归因（粗心/思路/知识）",
      "逻辑真题限时正确率目标：≥80%"
    ]
  },
  {
    id: "w7", name: "第7周", time: "11月30日 — 12月6日", phase: "冲刺",
    tasks: [
      "管综真题第四、五套（隔日一套，严格计时）",
      "英语二真题2套（限时3小时）",
      "英语大作文模板成文2篇并背诵",
      "全科错题第三轮（只看仍不会的）"
    ]
  },
  {
    id: "w8", name: "第8周", time: "12月7日 — 12月13日", phase: "冲刺",
    tasks: [
      "全真模拟2次：按真实时间 8:30管综 / 14:00 英语二",
      "写作模板最终定型（论证有效性分析4类漏洞话术、论说文万能结构）",
      "英语作文模板默写过关",
      "准考证下载（考前10天开放）+ 确认考点"
    ]
  },
  {
    id: "w9", name: "第9周（考前）", time: "12月14日 — 12月18日", phase: "冲刺",
    tasks: [
      "每日1套保持手感（做完对答案即可，不再深挖新题）",
      "错题速览：只看标记\"仍易错\"的题",
      "背诵：数学公式卡片 + 写作模板 + 英语作文模板",
      "12月18日：踩点看考场，早睡调整作息，备好证件文具"
    ]
  }
];

// 每日打卡默认任务
const DAILY_TASKS = [
  { icon: "∑", text: "管综数学限时练习 25题 / 40min" },
  { icon: "◈", text: "逻辑限时练习 10题 / 20min" },
  { icon: "A", text: "英语阅读精读 1篇（逐句翻译）" },
  { icon: "词", text: "核心词汇 50个（复习+新学）" },
  { icon: "✎", text: "当日错题复盘（弄懂为止）" }
];

const QUOTES = [
  "备考路上最慢的不是脚步，而是原地打转的犹豫。",
  "管综拼的不是聪明，是谁把错题本用得更狠。",
  "你现在多刷的每一道题，考场上都会变成你的底气。",
  "逻辑的本质是套路，数学的本质是熟练，作文的本质是模板。",
  "别和别人比进度，和昨天的自己比正确率。",
  "报名了就别回头，12月19日的考场见分晓。",
  "真题刷三遍，胜过模拟题刷三十遍。",
  "每日闭环：学—练—错—复盘。四步缺一不可。"
];

// ============================================================
// 题库（53题）
// subject: math / logic / english
// answer: 选项下标 0-4
// ============================================================
const QUESTIONS = [
  // ---------- 管综数学：问题求解 ----------
  {
    id: "m1", subject: "math", topic: "算术·比例", type: "问题求解",
    q: "某商品按定价的8折出售，仍可获利20%。若按定价出售，则利润率为（）。",
    options: ["25%", "30%", "40%", "50%", "60%"],
    answer: 3,
    explain: "设成本为C、定价为P。0.8P = 1.2C，得 P = 1.5C。按定价出售利润率 = (P−C)/C = 50%。"
  },
  {
    id: "m2", subject: "math", topic: "代数·数列", type: "问题求解",
    q: "三个数成等差数列，其和为24，平方和为194，则这三个数中最大的一个是（）。",
    options: ["9", "10", "11", "12", "13"],
    answer: 0,
    explain: "设三数为 a−d, a, a+d，则 3a=24 → a=8。平方和： (8−d)²+64+(8+d)² = 192+2d² = 194，得 d²=1。最大数为 8+d=9（d取正值）。"
  },
  {
    id: "m3", subject: "math", topic: "代数·数列", type: "问题求解",
    q: "等比数列 {aₙ} 中，a₁=2，公比 q=3，则前4项和 S₄ =（）。",
    options: ["60", "70", "80", "90", "100"],
    answer: 2,
    explain: "S₄ = a₁(1−q⁴)/(1−q) = 2×(1−81)/(1−3) = 2×(−80)/(−2) = 80。验证：2+6+18+54=80。"
  },
  {
    id: "m4", subject: "math", topic: "数据分析·组合", type: "问题求解",
    q: "从5名男生和4名女生中选出3人组成代表队，要求至少有1名女生，不同的选法共有（）种。",
    options: ["64", "70", "74", "80", "84"],
    answer: 2,
    explain: "正难则反：至少1名女生 = 全部 − 全是男生 = C(9,3) − C(5,3) = 84 − 10 = 74。"
  },
  {
    id: "m5", subject: "math", topic: "数据分析·概率", type: "问题求解",
    q: "同时掷两枚均匀的骰子，点数之和恰好为7的概率是（）。",
    options: ["1/12", "1/9", "1/6", "5/36", "7/36"],
    answer: 2,
    explain: "总事件36种。和为7：(1,6)(2,5)(3,4)(4,3)(5,2)(6,1) 共6种。P = 6/36 = 1/6。注意：7是出现频率最高的和。"
  },
  {
    id: "m6", subject: "math", topic: "几何·解析几何", type: "问题求解",
    q: "直线 3x + 4y − 5 = 0 与圆 x² + y² = 1 的位置关系是（）。",
    options: ["相离", "相切", "相交但不过圆心", "相交且过圆心", "无法确定"],
    answer: 1,
    explain: "圆心(0,0)到直线距离 d = |−5|/√(3²+4²) = 5/5 = 1 = 半径，故相切。判断位置关系就是比较 d 与 r，这是必考套路。"
  },
  {
    id: "m8", subject: "math", topic: "算术·工程问题", type: "问题求解",
    q: "一项工程，甲单独做12天完成，乙单独做18天完成。两人合作3天后，甲撤走，剩下的工程由乙单独完成，还需要（）天。",
    options: ["9", "9.5", "10", "10.5", "11"],
    answer: 3,
    explain: "设工程总量1。合作3天完成 3×(1/12+1/18) = 3×5/36 = 5/12。剩余 7/12 由乙做：(7/12)÷(1/18) = 10.5天。"
  },
  {
    id: "m9", subject: "math", topic: "算术·行程问题", type: "问题求解",
    q: "汽车从A地到B地速度为60km/h，按原路返回速度为50km/h，则往返的平均速度为（）km/h。",
    options: ["55", "54", "600/11", "110/2", "58"],
    answer: 2,
    explain: "平均速度=总路程÷总时间。设单程为s：2s / (s/60 + s/50) = 2 / (1/60+1/50) = 2×3000/(50+60) = 600/11 ≈ 54.5。平均速度≠速度的算术平均，是调和平均。"
  },
  {
    id: "m10", subject: "math", topic: "代数·绝对值", type: "问题求解",
    q: "函数 f(x) = |x−2| + |x+1| 的最小值为（）。",
    options: ["1", "2", "3", "4", "不存在"],
    answer: 2,
    explain: "几何意义：x 到 2 与到 −1 的距离之和。当 x 介于 [−1, 2] 之间时取得最小值 = |2−(−1)| = 3。"
  },
  {
    id: "m11", subject: "math", topic: "代数·不等式", type: "问题求解",
    q: "已知 x > 0，则 y = x + 4/x 的最小值为（）。",
    options: ["2", "4", "2√2", "5", "8"],
    answer: 1,
    explain: "均值不等式：x + 4/x ≥ 2√(x·4/x) = 4，当且仅当 x = 4/x 即 x=2 时取等。口诀\"一正、二定、三相等\"。"
  },
  {
    id: "m12", subject: "math", topic: "算术·质数", type: "问题求解",
    q: "从 3、5、7、11 这四个质数中任取两个相乘，可以得到（）个不同的积。",
    options: ["4", "5", "6", "8", "12"],
    answer: 2,
    explain: "任取两个：C(4,2)=6 种组合，逐一验证 15,21,33,35,55,77 互不相同，故为6。也可直接验证无重复积再选 C(4,2)。"
  },
  {
    id: "m13", subject: "math", topic: "算术·容斥", type: "问题求解",
    q: "某班30名学生中，喜欢数学的有20人，喜欢英语的有15人，两门都喜欢的有8人，则两门都不喜欢的有（）人。",
    options: ["2", "3", "4", "5", "7"],
    answer: 1,
    explain: "至少喜欢一门：20+15−8=27。都不喜欢：30−27=3。容斥原理基本模型，画文氏图最直观。"
  },
  {
    id: "m14", subject: "math", topic: "代数·二次函数", type: "问题求解",
    q: "二次函数 y = x² − 4x + 5 在区间 [0, 3] 上的最大值为（）。",
    options: ["1", "2", "3", "4", "5"],
    answer: 4,
    explain: "对称轴 x=2 在区间内，顶点值为最小值 y(2)=1。最大值在端点比较：y(0)=5，y(3)=2。故最大值5。注意开口向上时顶点是\"谷\"不是\"峰\"。"
  },
  {
    id: "m15", subject: "math", topic: "代数·不等式", type: "问题求解",
    q: "不等式 x² − 5x + 6 < 0 的解集为（）。",
    options: ["x<2 或 x>3", "2<x<3", "x<−2 或 x>−3", "−3<x<−2", "x>3"],
    answer: 1,
    explain: "因式分解 (x−2)(x−3)<0，\"小于取中间\"：2<x<3。口诀：大于取两边，小于取中间（前提：二次项系数为正）。"
  },
  {
    id: "m16", subject: "math", topic: "算术·应用", type: "问题求解",
    q: "某人将10000元存入银行，年利率5%，按复利计息，两年后本息共（）元。",
    options: ["10500", "11000", "11025", "11250", "11500"],
    answer: 2,
    explain: "复利：10000×(1+5%)² = 10000×1.1025 = 11025。复利=利滚利，指数计算；单利是 10000×(1+2×5%)=11000，注意区分。"
  },
  {
    id: "m17", subject: "math", topic: "代数·裂项", type: "问题求解",
    q: "1/(1×2) + 1/(2×3) + … + 1/(9×10) =（）。",
    options: ["8/9", "9/10", "1", "10/11", "5/6"],
    answer: 1,
    explain: "裂项：1/(n(n+1)) = 1/n − 1/(n+1)，求和后中间项相消，= 1 − 1/10 = 9/10。"
  },
  {
    id: "m18", subject: "math", topic: "几何·三角形", type: "问题求解",
    q: "直角三角形两条直角边分别为5和12，则斜边上的高为（）。",
    options: ["60/13", "5/12", "6", "13/2", "30/13"],
    answer: 0,
    explain: "斜边 = √(25+144) = 13。用面积桥：½×5×12 = ½×13×h，得 h = 60/13。"
  },
  {
    id: "m19", subject: "math", topic: "几何·立体", type: "问题求解",
    q: "长方体的长、宽、高分别为4、3、5，则其体对角线长为（）。",
    options: ["√38", "2√10", "5√2", "√52", "7"],
    answer: 2,
    explain: "体对角线 = √(a²+b²+c²) = √(16+9+25) = √50 = 5√2。"
  },
  {
    id: "m20", subject: "math", topic: "数据分析·统计", type: "问题求解",
    q: "数据 2, 4, 6, 8, 10 的方差为（）。",
    options: ["6", "8", "10", "16", "40"],
    answer: 1,
    explain: "均值 x̄=6。方差 = [(−4)²+(−2)²+0²+2²+4²]/5 = (16+4+0+4+16)/5 = 8。方差性质：数据加常数不变，乘k变为k²倍。"
  },
  // ---------- 管综数学：条件充分性判断 ----------
  {
    id: "d1", subject: "math", topic: "条件充分性判断", type: "条件充分性判断",
    q: "条件充分性判断：能确定 x > 3。\n(1) x² > 9\n(2) x + 1/x < 0",
    options: ["条件(1)充分，条件(2)不充分", "条件(2)充分，条件(1)不充分", "条件(1)(2)单独都不充分，但联合充分", "条件(1)(2)单独都充分", "条件(1)(2)单独都不充分，联合也不充分"],
    answer: 4,
    explain: "(1)：x²>9 → x>3 或 x<−3，不充分。(2)：x+1/x<0 → x<0，不充分。联合：x<0 且 x<−3 → 只能得 x<−3，反而与 x>3 矛盾，不充分。选E。"
  },
  {
    id: "d2", subject: "math", topic: "条件充分性判断", type: "条件充分性判断",
    q: "条件充分性判断：能确定 x 的值。\n(1) x² = 4\n(2) x < 0",
    options: ["条件(1)充分，条件(2)不充分", "条件(2)充分，条件(1)不充分", "条件(1)(2)单独都不充分，但联合充分", "条件(1)(2)单独都充分", "条件(1)(2)单独都不充分，联合也不充分"],
    answer: 2,
    explain: "(1)：x=2 或 x=−2，不能确定唯一值，不充分。(2)：x<0 有无数取值，不充分。联合：x=−2，确定，充分。选C。做此类题的口诀：先各自单独验证，再考虑联合。"
  },
  {
    id: "d3", subject: "math", topic: "条件充分性判断", type: "条件充分性判断",
    q: "条件充分性判断：n 为正整数，则 n 是3的倍数。\n(1) n² 是3的倍数\n(2) n 是6的倍数",
    options: ["条件(1)充分，条件(2)不充分", "条件(2)充分，条件(1)不充分", "条件(1)(2)单独都不充分，但联合充分", "条件(1)(2)单独都充分", "条件(1)(2)单独都不充分，联合也不充分"],
    answer: 3,
    explain: "(1)：3是质数，若 3|n² 则 3|n（质数整除性质），充分。(2)：6的倍数必是3的倍数，充分。两个都充分，选D。"
  },
  // ---------- 管综逻辑 ----------
  {
    id: "l1", subject: "logic", topic: "形式逻辑", type: "单选",
    q: "\"所有成功人士都是勤奋的人。小张非常勤奋。因此，小张一定会在事业上取得成功。\"以下哪项恰当地指出了上述推理的错误？",
    options: [
      "\"所有成功人士都勤奋\"只表明勤奋是成功的必要条件，题干误将其当作充分条件使用",
      "题干两个前提之间相互矛盾",
      "题干犯了\"平均数谬误\"",
      "小张是否勤奋无法从前提中确定",
      "题干混淆了\"成功\"与\"事业成功\"两个不同概念"
    ],
    answer: 0,
    explain: "翻译：成功→勤奋。由\"小张勤奋\"（肯定后件）推\"小张成功\"是无效推理，本质是把必要条件（勤奋）当成了充分条件。注意：肯定后件与否定前件是形式逻辑最高频考点。"
  },
  {
    id: "l2", subject: "logic", topic: "形式逻辑", type: "单选",
    q: "\"只有通过笔试，才能进入面试。\"根据这一断定，以下哪项必然为真？",
    options: [
      "小李通过了笔试，所以他一定能进入面试",
      "小李进入了面试，所以他一定通过了笔试",
      "小李没通过笔试，但他进入了面试",
      "通过笔试的人都会进入面试",
      "没进入面试的人都没有通过笔试"
    ],
    answer: 1,
    explain: "\"只有p才q\"翻译为 q→p，即 面试→笔试。B是顺推。A、D把必要条件当充分条件；C直接与断定矛盾；E犯\"否定前件推否定后件的镜像\"错误——正确逆否是\"没通过笔试→没进入面试\"。"
  },
  {
    id: "l3", subject: "logic", topic: "形式逻辑", type: "单选",
    q: "\"除非小王完成作业，否则不能出去玩。\"以下哪项与这句话的逻辑含义相同？",
    options: [
      "小王完成了作业，就能出去玩",
      "小王没完成作业，就一定不能出去玩",
      "小王出去玩了，说明他没完成作业",
      "小王不能出去玩，是因为没完成作业",
      "只有出去玩，才能完成作业"
    ],
    answer: 1,
    explain: "\"除非p，否则q\" = ¬p→q = ¬q→p。这里p=完成作业，q=不能出去玩。等值于：没完成作业→不能出去玩（B），也等值于能出去玩→完成了作业。A把必要当充分。"
  },
  {
    id: "l4", subject: "logic", topic: "形式逻辑", type: "单选",
    q: "已知：\"甲、乙、丙三人中至多一人缺席会议。\"若再加上\"甲缺席了会议\"，可以推出（）。",
    options: [
      "乙和丙都出席了会议",
      "乙缺席了会议",
      "丙缺席了会议",
      "乙和丙中至少有一人缺席",
      "乙和丙都缺席了会议"
    ],
    answer: 0,
    explain: "\"至多一人缺席\"即缺席人数≤1。已知甲缺席，名额已用完，故乙、丙必然都出席。做\"至多/至少\"题时可用极端原则验证。"
  },
  {
    id: "l5", subject: "logic", topic: "形式逻辑", type: "单选",
    q: "\"并非所有的努力都会有回报\"等值于（）。",
    options: [
      "所有的努力都没有回报",
      "有的努力没有回报",
      "有的努力有回报",
      "并非有的努力有回报",
      "所有的努力都有回报"
    ],
    answer: 1,
    explain: "并非(所有S是P) = 有的S不是P。注意不能推进到\"所有都没有回报\"——\"有的\"只保证至少一个，是存在量词，量词转换是模态/直言命题的高频考点。"
  },
  {
    id: "l6", subject: "logic", topic: "形式逻辑", type: "单选",
    q: "\"不可能所有应聘者都被录取\"等值于（）。",
    options: [
      "必然有的应聘者不被录取",
      "可能所有应聘者都不被录取",
      "必然所有应聘者都不被录取",
      "可能有的应聘者被录取",
      "不可能有的应聘者被录取"
    ],
    answer: 0,
    explain: "¬◇(所有被录取) = □¬(所有被录取) = □(有的不被录取)。口诀：\"不+可能\"变\"必然+矛盾命题\"：不可能所有=必然有的不。"
  },
  {
    id: "l7", subject: "logic", topic: "论证推理", type: "单选",
    q: "一项对某高校毕业生的调查显示：经常使用图书馆的学生平均成绩明显高于不常去图书馆的学生。因此学校建议所有学生多去图书馆以提高成绩。以下哪项如果为真，最能削弱上述建议？",
    options: [
      "该校图书馆座位紧张，高峰期常一座难求",
      "成绩好的学生本来就更喜欢去图书馆自习，成绩差的学生即便去了也难以坚持",
      "有些经常去图书馆的学生成绩也不理想",
      "该校图书馆藏书量并不大",
      "调查只持续了一个学期"
    ],
    answer: 1,
    explain: "B指出\"因果倒置\"的可能：不是去图书馆导致成绩好，而是成绩好（学习习惯好）导致爱去图书馆。因果倒置几乎总是最强削弱。其余选项均未触及论证链条。"
  },
  {
    id: "l8", subject: "logic", topic: "论证推理", type: "单选",
    q: "某市去年在全市中小学推广\"课间体育半小时\"后，学生体质监测优秀率较前年上升了8个百分点。市教育局由此认为该政策效果显著。以下哪项如果为真，最能支持教育局的结论？",
    options: [
      "同期未推行该政策的邻近城市，学生体质优秀率基本持平",
      "学生家长普遍支持该政策",
      "该政策实施成本较低",
      "个别学校反映课间时间不够用",
      "该市体育教师数量同期有所增加"
    ],
    answer: 0,
    explain: "A提供了\"对照组\"：没有政策的城市优秀率没涨，说明本市上涨并非整体趋势等他因，从而支持政策与结果的因果联系。这是\"无因无果\"式支持。E反而提供了削弱性的他因。"
  },
  {
    id: "l9", subject: "logic", topic: "论证推理", type: "单选",
    q: "\"近五年来，我市汽车保有量增长了一倍，同期呼吸道疾病发病率也明显上升。因此，汽车增多是呼吸道疾病发病率上升的主要原因。\"以下哪项是上述论证最需要的假设？",
    options: [
      "呼吸道疾病不会人传人",
      "这五年间其他空气污染源（如工厂排放、工地扬尘）没有明显增加",
      "市民就医意识逐年增强",
      "私家车的日均使用强度逐年上升",
      "呼吸道疾病发病率上升是全球普遍现象"
    ],
    answer: 1,
    explain: "归因类论证必须排除他因。B正是\"排除他因\"式假设——若其他污染源同期也大增，\"主因\"的归因就站不住。C、E反而是削弱（检出率上升/全球趋势）。"
  },
  {
    id: "l10", subject: "logic", topic: "论证推理", type: "单选",
    q: "某连锁餐厅去年将招牌菜提价15%，全年利润反而下降了。以下哪项如果为真，最能解释这一看似矛盾的现象？",
    options: [
      "该餐厅的其他菜品也同时小幅提价",
      "提价后部分老顾客转而去隔壁新开的两家平价餐厅，客流量下降了20%",
      "招牌菜原材料成本占售价比例较低",
      "餐厅去年翻新了门店",
      "利润下降是整个行业的普遍现象"
    ],
    answer: 1,
    explain: "解释题要同时容纳\"提价\"与\"利润下降\"两个事实。B给出了完整机制：提价→客源流失→量减利降。E把原因推给行业，未能利用\"提价\"这一关键信息，解释力弱。"
  },
  {
    id: "l11", subject: "logic", topic: "分析推理", type: "单选",
    q: "A、B、C、D、E 五人赛跑分获第1至第5名（无并列）。已知：①B 比 A 名次靠前；②C 不是第1名；③D 是第2名且 E 紧随其后。则第一名是（）。",
    options: ["A", "B", "C", "E", "无法确定"],
    answer: 1,
    explain: "由③：D第2、E第3，剩下第1、4、5名给A、B、C。C不能第1；A若第1则与\"B在A前\"矛盾。故第1只能是B。A、C分列第4、5（顺序虽不确定，但第1唯一）。排序题先处理\"固定位置\"条件。"
  },
  {
    id: "l12", subject: "logic", topic: "分析推理", type: "单选",
    q: "花瓶碎了，四个孩子中只有一人打碎了它。甲说：\"不是我。\"乙说：\"是丙打碎的。\"丙说：\"是丁打碎的。\"丁说：\"丙在说谎。\"已知四人中只有一人说真话，且打碎花瓶的人也说了谎。谁打碎了花瓶？",
    options: ["甲", "乙", "丙", "丁", "无法确定"],
    answer: 0,
    explain: "丙说\"是丁\"，丁说\"不是丁\"（丙说谎），丙丁矛盾，必一真一假 → 唯一的真话在丙丁之间 → 甲乙都说谎。甲说\"不是我\"为假 → 是甲打碎的。验证：乙\"是丙\"为假✓。真假话题口诀：先找矛盾，绕开矛盾看其余。"
  },
  {
    id: "l13", subject: "logic", topic: "分析推理", type: "单选",
    q: "张、王、李三位老师分别教语文、数学、英语（每人只教一门）。已知：①张老师不教语文；②教数学的老师比李老师年长；③张老师比教英语的老师年长。则张老师教（）。",
    options: ["语文", "数学", "英语", "数学或英语", "无法确定"],
    answer: 1,
    explain: "由②：李老师不教数学。由③：张老师不教英语（否则他比自己年长，矛盾）。再由①张不教语文 → 张只能教数学。三条件恰好把张逼到唯一选项，匹配题从\"最大信息/最确定信息\"入手。"
  },
  {
    id: "l14", subject: "logic", topic: "论证推理", type: "单选",
    q: "研究发现：经常吃夜宵的大学生肥胖比例高于不吃夜宵的学生，因此有专家建议大学生戒掉夜宵以避免肥胖。以下哪项如果为真，最能质疑专家的建议？",
    options: [
      "有些经常吃夜宵的学生并不肥胖",
      "肥胖的学生因为晚上容易饿，反而更经常吃夜宵",
      "夜宵的营养价值普遍较低",
      "该研究的样本只来自一所大学",
      "不吃夜宵的学生中有极少数人也肥胖"
    ],
    answer: 1,
    explain: "B指出因果倒置：可能不是夜宵导致肥胖，而是肥胖（易饿）导致吃夜宵。因果倒置直接动摇\"戒夜宵能避免肥胖\"的建议。A、E是\"个别反例\"，削弱力弱；D是样本质疑，弱于B。"
  },
  {
    id: "l15", subject: "logic", topic: "论证推理", type: "单选",
    q: "\"如果长期熬夜，就会损害健康。小王不熬夜，所以小王的健康不会受损。\"以下哪项与上述推理犯了相同的逻辑错误？",
    options: [
      "如果下雨，地面会湿。昨夜下了雨，地面果然湿了",
      "只有年满十八岁才有选举权。小刘有选举权，所以他年满十八岁",
      "如果物体受热，体积会膨胀。该物体未受热，所以体积不会膨胀",
      "如果考试作弊，就会被处分。小李被处分了，所以他作弊了",
      "如果多吃蔬菜，就有益健康。小赵多吃蔬菜，所以他身体健康"
    ],
    answer: 2,
    explain: "题干结构：p→q，¬p，所以¬q，是\"否定前件\"谬误。C完全同构。D是\"肯定后件\"谬误；B是有效推理（必要条件顺推）；A、E是有效的肯定前件。识别\"推理结构相同\"题，先抽象出字母式再比对。"
  },
  {
    id: "l16", subject: "logic", topic: "论证推理", type: "单选",
    q: "为缓解城市交通拥堵，某市计划实施私家车尾号限行。以下哪项如果为真，最能质疑该措施的效果？",
    options: [
      "部分市民表示不理解该政策",
      "限行后不少家庭购置第二辆车，被限行当天改用另一辆车出行",
      "该市公交系统近年来有所改善",
      "该政策在其他城市实施时曾引起争议",
      "尾号限行的技术实现较为复杂"
    ],
    answer: 1,
    explain: "质疑措施类题目找\"措施失效\"的路径。B说明出行需求并未减少，只是换车规避，拥堵依旧，直接切断\"手段→目的\"。其余选项不涉及效果本身。"
  },
  {
    id: "l17", subject: "logic", topic: "分析推理", type: "单选",
    q: "某小组要在甲、乙、丙、丁四人中选派两人参加比赛。已知：①如果选甲，就不选乙；②乙和丙要么都选，要么都不选；③丁和丙至少选一个。以下哪项是可行的选派方案？",
    options: [
      "甲和乙",
      "乙和丙",
      "丙和丁",
      "甲和丙",
      "乙和丁"
    ],
    answer: 1,
    explain: "逐项验证：A违①；B：满足①（不选甲即可）、②、③，可行✓；C选丙不选乙违②；D同违②；E选乙不选丙违②。选派/组合题用代入排除最快。"
  },
  // ---------- 英语二 ----------
  {
    id: "e1", subject: "english", topic: "词汇", type: "单选",
    q: "The new policy is expected to _____ the financial burden on low-income families.",
    options: ["aggravate", "alleviate", "aggregate", "allocate"],
    answer: 1,
    explain: "alleviate 减轻（burden 常见搭配）；aggravate 加重；aggregate 聚集、总计；allocate 分配。句意：新政策有望减轻低收入家庭的经济负担。形近词是完形高频考点。"
  },
  {
    id: "e2", subject: "english", topic: "词汇", type: "单选",
    q: "The manager's _____ explanation failed to convince the board.",
    options: ["deliberate", "moderate", "feeble", "intact"],
    answer: 2,
    explain: "feeble 软弱无力的（解释苍白→无法说服）；deliberate 故意的；moderate 温和的；intact 完好无损的。形容\"没有说服力的解释\"用 feeble。"
  },
  {
    id: "e3", subject: "english", topic: "词汇", type: "单选",
    q: "He found it difficult to _____ himself to the new working environment.",
    options: ["adopt", "adapt", "adept", "object"],
    answer: 1,
    explain: "adapt oneself to... 使自己适应，固定搭配。adopt 采纳、收养；adept（形容词）擅长的；object 反对。adapt/adopt 是英语二最常考的形近词对之一。"
  },
  {
    id: "e4", subject: "english", topic: "语法·虚拟语气", type: "单选",
    q: "If I _____ in your position, I would consult a lawyer first.",
    options: ["am", "was", "were", "be"],
    answer: 2,
    explain: "对现在事实的虚拟：If 从句用过去式（be 一律用 were），主句 would+动词原形。虚拟语气三个公式必须烂熟：与现在相反（were + would do）、与过去相反（had done + would have done）、与将来相反（should do）。"
  },
  {
    id: "e5", subject: "english", topic: "语法·时态", type: "单选",
    q: "By the end of last year, the company _____ more than 50 community libraries.",
    options: ["has built", "had built", "built", "was building"],
    answer: 1,
    explain: "\"by + 过去时间点\"用过去完成时 had done，表示\"到过去某时为止已完成\"。对比：by now 用现在完成时。"
  },
  {
    id: "e6", subject: "english", topic: "词汇", type: "单选",
    q: "The word \"revenue\" is closest in meaning to _____.",
    options: ["reputation", "expense", "income", "reserve"],
    answer: 2,
    explain: "revenue 收入、营收（= income），图表作文和经济类阅读高频词。expense 支出；reputation 声誉；reserve 储备。管综同学尤其要熟：revenue / expenditure / profit / budget 词族。"
  },
  {
    id: "e7", subject: "english", topic: "词汇", type: "单选",
    q: "\"Comply with the regulations\" 最接近（）。",
    options: ["violate the regulations", "abide by the regulations", "ignore the regulations", "amend the regulations"],
    answer: 1,
    explain: "comply with = abide by = conform to，都是\"遵守\"，社会管理类阅读高频。violate 违反；ignore 无视；amend 修订。"
  },
  {
    id: "e8", subject: "english", topic: "词汇", type: "单选",
    q: "The survey _____ 2,000 respondents across five provinces.",
    options: ["evolved", "involved", "revolved", "resolved"],
    answer: 1,
    explain: "involved 涉及、包含（样本量）；evolved 演变；revolved 旋转；resolved 解决、决心。形近词辨析，调查研究类文章标配。"
  },
  {
    id: "e9", subject: "english", topic: "语法·介词连词", type: "单选",
    q: "_____ the rising costs, the factory decided to upgrade its equipment.",
    options: ["Despite", "Although", "Because", "Unless"],
    answer: 0,
    explain: "despite 是介词，后接名词短语 the rising costs；although 是连词，后必须接从句。这一区别是完形与语法填空的高频陷阱。"
  },
  {
    id: "e10", subject: "english", topic: "语法·虚拟", type: "单选",
    q: "The professor suggested that the report _____ revised before submission.",
    options: ["is", "was", "be", "would be"],
    answer: 2,
    explain: "suggest（建议）、demand、require、insist（坚持要求）等词后的宾语从句用 (should) + 动词原形的虚拟语气，should 常省略。"
  },
  // ---------- 英语二：阅读理解 ----------
  {
    id: "r1", subject: "english", topic: "阅读理解", type: "阅读",
    passage: "Urban green spaces have long been praised for making cities more livable, but their health benefits have been difficult to measure. A recent study of 9,000 residents in three Chinese cities offers new evidence. People living within 300 meters of a public park reported better mental health and exercised 40 minutes more per week than those living farther away. The effect was strongest among the elderly and low-income groups, suggesting that parks may help reduce health inequalities. However, the researchers caution against simple conclusions. Healthier people may deliberately choose to live near green spaces, and neighborhoods with parks often have other advantages, such as lower noise and better air quality. The study's lead author noted that building new parks is only one part of the solution; improving access to existing parks matters just as much.",
    q: "According to the study, people living near parks _____.",
    options: [
      "exercised 40 minutes more per day",
      "reported better mental health",
      "moved to healthier neighborhoods",
      "paid less for housing"
    ],
    answer: 1,
    explain: "细节题：定位到第二、三句\"reported better mental health and exercised 40 minutes more per week\"。A偷换时间（per day vs per week）——数字题的\"单位与范围\"是细节题最常见陷阱。"
  },
  {
    id: "r2", subject: "english", topic: "阅读理解", type: "阅读",
    q: "The effect of green spaces was strongest among _____.",
    options: [
      "young professionals",
      "city officials",
      "the elderly and low-income groups",
      "people who already exercised regularly"
    ],
    answer: 2,
    explain: "细节题：\"The effect was strongest among the elderly and low-income groups\"，原文原词复现，定位即可。注意 D 是典型的\"无中生有+常识干扰\"。"
  },
  {
    id: "r3", subject: "english", topic: "阅读理解", type: "阅读",
    q: "The researchers' caution suggests that the study _____.",
    options: [
      "proves that parks improve health",
      "cannot fully establish cause and effect",
      "surveyed too many people",
      "focused on the wrong cities"
    ],
    answer: 1,
    explain: "推断题：caution 后说明\"健康者可能主动选择住公园附近\"（因果倒置）\"公园社区有其他优势\"（另有他因），即因果关系尚未确立。注意与逻辑论证题的削弱套路完全相通——考研英语阅读和管综逻辑可以互相借力。"
  },
  {
    id: "r4", subject: "english", topic: "阅读理解", type: "阅读",
    q: "Which of the following best states the main idea of the passage?",
    options: [
      "The cost of building urban parks is rising",
      "A study links green spaces to health, but causation remains uncertain",
      "How to design a public park",
      "Health inequalities are widening in Chinese cities"
    ],
    answer: 1,
    explain: "主旨题：全文先呈现研究的正面发现，再用 However 转折提出局限。转折词后是重心。B 同时概括了\"发现\"与\"局限\"两个层面。注意主旨题优先选\"包含转折后内容\"的选项。"
  }
];

// 科目元信息
const SUBJECTS = {
  math: { key: "math", name: "管综数学", icon: "∑", color: "#b4531f", desc: "75分 · 25题 · 问题求解+条件充分性判断", questionCount: 25, minutes: 60 },
  logic: { key: "logic", name: "管综逻辑", icon: "◈", color: "#5a4a8a", desc: "60分 · 30题 · 形式/论证/分析推理", questionCount: 30, minutes: 50 },
  writing: { key: "writing", name: "管综写作", icon: "✎", color: "#a33e48", desc: "65分 · 论证有效性分析30分 + 论说文35分" },
  english: { key: "english", name: "英语二", icon: "En", color: "#1e6e5c", desc: "100分 · 完形/阅读/翻译/写作" }
};
