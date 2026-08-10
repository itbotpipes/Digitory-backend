const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const Solution = require('../src/models/solution.model');

const sampleSolutions = [
  {
    slug: 'pos',
    shortLabel: 'Integrated POS',
    title: 'Multi-channel integrated POS',
    badge: '01 • POS',
    subtitle: 'Restaurant POS software built for real restaurant work',
    description: 'Digitory helps restaurants, cafés, bars, breweries, and cloud kitchens manage their daily operations with one simple system. Take orders, create bills, track inventory, manage staff, and view business reports, all from one platform. Whether you have one outlet or many, Digitory helps you save time, reduce mistakes, and run your business with confidence.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by restaurants, cafés, bars, and breweries across India.',
    icon: '',
    whyChoose: [
      {
        title: 'Built for Indian restaurants',
        desc: 'Running a restaurant in India comes with unique challenges. Online orders, GST, busy weekends, multiple outlets, and changing menus can quickly become difficult to manage. Digitory is designed to handle these everyday challenges so your team can work faster and more efficiently.'
      },
      {
        title: 'Everything in one place',
        desc: 'There\'s no need for separate software for billing, inventory, online orders, or reports. Digitory brings everything together into one easy-to-use system. Fewer app switches mean fewer mistakes and more time for your customers.'
      },
      {
        title: 'Manage your business from anywhere',
        desc: 'Keep an eye on your restaurant even when you\'re away. View sales, orders, inventory, and reports in real time from your phone or computer. No matter where you are, you\'ll always know how your business is performing.'
      }
    ],
    featuresTitle: 'Everything you need to run your restaurant',
    features: [
      {
        title: 'Smart billing and order management',
        desc: 'Take orders for dine-in, takeaway, delivery, and online platforms from one screen. Split bills, merge tables, apply discounts, and complete billing quickly.'
      },
      {
        title: 'Easy menu management',
        desc: 'Update your menu once and apply the changes across all your outlets and online ordering platforms. You can also schedule offers, happy hours, and special menus in advance.'
      },
      {
        title: 'Inventory made simple',
        desc: 'Track ingredients automatically whenever an order is placed. Get low-stock alerts, reduce food waste, and always know what needs to be reordered.'
      },
      {
        title: 'Staff management',
        desc: 'Track staff attendance, sales performance, work shifts, and user permissions from one dashboard. Keep your team organised and your operations running smoothly.'
      },
      {
        title: 'Connect with the tools you already use',
        desc: 'Digitory works with many of the platforms restaurants use every day, including Swiggy, Zomato, QR code ordering, Kitchen Display System (KDS), Self-order kiosks, Delivery management systems, CRM and ERP software.'
      },
      {
        title: 'Reports that help you make better decisions',
        desc: 'See what\'s selling the most, monitor sales trends, track inventory, and compare outlet performance with easy-to-read reports. Instead of guessing, you can make decisions based on real numbers.'
      }
    ],
    businessTypes: [
      { name: 'Restaurants', desc: 'Manage tables, route kitchen orders, customise bills, and collect customer feedback.' },
      { name: 'Bars', desc: 'Manage bar tabs, track liquor inventory, monitor recipes, and improve service speed.' },
      { name: 'Breweries', desc: 'Track brewing batches, manage tap sales, and reward loyal customers with custom loyalty programs.' },
      { name: 'Pubs', desc: 'Run happy hour offers, manage promotions, reward regular customers, and handle event billing with ease.' },
      { name: 'Cafés', desc: 'Handle busy rush hours with fast billing, combo offers, mobile POS, and quick counter service.' },
      { name: 'Bakeries, Dessert Shops & Ice Cream Parlours', desc: 'Manage item-wise or weight-based billing, monitor expiry dates, and increase sales with smart product recommendations.' }
    ],
    integrations: [
      { title: 'Accounting', items: 'Tally, Zoho Books, QuickBooks' },
      { title: 'Payments', items: 'Razorpay, Paytm, Google Pay, UPI, Credit Cards' },
      { title: 'Online Ordering', items: 'Swiggy, Zomato, DotPe, Thrive, and more' },
      { title: 'Customer Engagement', items: 'WhatsApp automation, SMS campaigns, loyalty programs, and CRM tools' }
    ],
    extraGrowth: {
      title: 'Grow your business with confidence',
      desc: 'Whether you have one outlet or a growing chain, Digitory grows with you. Manage all your locations from one dashboard. Keep menus consistent, update prices, manage franchises, and control outlet-specific offers with ease.'
    },
    extraOwnersChoice: {
      title: 'Why restaurant owners choose Digitory',
      desc: 'Restaurants using Digitory have reduced food waste, improved inventory control, expanded to multiple locations more easily, and simplified their daily operations. Our goal is simple: help restaurant owners spend less time solving problems and more time growing their business.'
    },
    supportItems: [
      'Training for your team',
      'Quick onboarding',
      'Phone, chat, and email support',
      'Compatibility with printers, cash drawers, and POS hardware',
      'Custom dashboards for owners, managers, accountants, chefs, and staff'
    ],
    securityItems: [
      'Secure cloud storage',
      'Automatic backups',
      'GST-compliant billing and reports',
      'User access controls',
      'Activity logs for better security'
    ],
    ctaBlock: {
      title: 'Ready to simplify your restaurant operations?',
      desc: 'Digitory helps restaurants save time, reduce manual work, and stay in control of every part of the business. From neighbourhood cafés to multi-outlet restaurant chains, restaurants across India trust Digitory to help them grow.'
    }
  },
  {
    slug: 'kds',
    shortLabel: 'Kitchen Display',
    title: 'Kitchen display system',
    badge: '02 • KDS',
    subtitle: 'Kitchen Display System (KDS) for faster, smarter kitchens',
    description: 'A busy kitchen needs more than skilled chefs. It needs a system that keeps every order organised. Digitory\'s Kitchen Display System (KDS) sends orders directly from the billing counter to the kitchen screen in real time. No paper tickets, no confusion, and no missed orders. Whether you run a restaurant, café, bar, brewery, or cloud kitchen, Digitory helps your team prepare food faster and serve customers on time.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by restaurants, cafés, bars, and breweries across India.',
    icon: '',
    whyChoose: [
      {
        title: 'Orders reach the kitchen instantly',
        desc: 'The moment an order is placed, it appears on the kitchen screen. Your chefs can start preparing food immediately without waiting for printed tickets.'
      },
      {
        title: 'Fewer mistakes',
        desc: 'Digital orders are clear and easy to read. Special instructions like "less spicy," "no onions," or allergy requests are displayed clearly, helping your team prepare every order correctly.'
      },
      {
        title: 'Live updates for everyone',
        desc: 'The front desk and kitchen stay connected. As an order moves from preparation to serving, everyone sees the latest status in real time.'
      },
      {
        title: 'Faster kitchen operations',
        desc: 'Similar orders are grouped together, making it easier for chefs to prepare multiple dishes at once. This saves time, especially during lunch and dinner rush.'
      }
    ],
    featuresTitle: 'Why every modern restaurant needs a KDS',
    features: [
      {
        title: 'No more lost paper tickets',
        desc: 'Paper KOTs can get misplaced, damaged, or forgotten during busy hours. With Digitory KDS, every order appears instantly on the kitchen screen, so nothing gets missed.'
      },
      {
        title: 'Faster preparation and quicker service',
        desc: 'Chefs can clearly see which orders need to be prepared first. This helps reduce waiting time and allows tables to be served faster.'
      },
      {
        title: 'Save money and reduce waste',
        desc: 'By replacing printed kitchen tickets with digital screens, restaurants can reduce paper usage and lower printing costs. It\'s better for your business and better for the environment.'
      }
    ],
    businessTypes: [
      { name: 'Restaurants', desc: 'Manage multiple kitchen stations, course timing, and large order volumes with ease.' },
      { name: 'Cafés', desc: 'Prepare beverages and food together while keeping every order organised during peak hours.' },
      { name: 'Bars', desc: 'Separate drink orders from food orders so every station knows exactly what to prepare.' },
      { name: 'Breweries', desc: 'Send different parts of the same order to the right kitchen stations, whether it\'s the grill, pizza oven, or bar.' },
      { name: 'Pubs', desc: 'Handle busy evenings and happy hours without overwhelming your kitchen. The system helps balance incoming orders and reduce delays.' },
      { name: 'Cloud Kitchens', desc: 'Manage delivery orders from multiple platforms in one place and keep preparation running smoothly.' }
    ],
    integrations: [
      { title: 'Sync Modules', items: 'Digitory POS, Swiggy, Zomato, ONDC, Inventory Management, ERP Software, Accounting Systems' }
    ],
    extraGrowth: {
      title: 'Better insights for better decisions',
      desc: 'Digitory helps you understand how your kitchen performs every day. You can find dishes that take the longest to prepare, identify your busiest hours, plan staff schedules more efficiently, and improve menu performance using real kitchen data.'
    },
    extraOwnersChoice: {
      title: 'What makes Digitory KDS different?',
      desc: 'Digitory is built for the way Indian restaurants actually work. From weekend rushes to online delivery spikes, it helps kitchens stay organised even during the busiest hours. It supports instant order updates from POS, QR ordering, Swiggy, and Zomato, along with batch cooking, clear special instructions, prep time tracking, off-line reliability, and kitchen performance reports.'
    },
    ctaBlock: {
      title: 'Make your kitchen faster and more organised',
      desc: 'A great kitchen isn\'t just about cooking good food. It\'s about preparing every order accurately, reducing delays, and keeping your team working together. Digitory\'s Kitchen Display System helps restaurants do exactly that, every single day.'
    }
  },
  {
    slug: 'inventory',
    shortLabel: 'Smart Inventory',
    title: 'Automated inventory management',
    badge: '03 • Inventory',
    subtitle: 'Automated inventory management for restaurants',
    description: 'Good food starts with good inventory management. If you don\'t know what you have in stock, you can end up wasting food, running out of ingredients, or spending more than you should. Digitory\'s automated Inventory Management System helps you track every ingredient automatically, so you always know what\'s available and what needs to be reordered.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.',
    icon: '',
    whyChoose: [
      {
        title: 'Why inventory management matters',
        desc: 'Managing inventory manually takes time and often leads to mistakes. Stock can run out unexpectedly, food can expire before it\'s used, ingredients can be over-ordered. All of this affects your profits. Digitory helps you avoid these problems by keeping your inventory updated in real time.'
      },
      {
        title: 'Automatic inventory tracking',
        desc: 'Every time an order is billed, the required ingredients are automatically deducted from your inventory. No manual updates. No guesswork. Just accurate stock levels at all times.'
      },
      {
        title: 'Know what\'s in stock',
        desc: 'See your inventory anytime, from anywhere. Check what\'s available, what\'s running low, and what needs to be ordered from one simple dashboard.'
      },
      {
        title: 'Reduce food waste',
        desc: 'Track expiry dates and monitor ingredient usage so you can use stock before it goes to waste. Buying the right quantity at the right time helps reduce unnecessary losses.'
      },
      {
        title: 'Never run out of important ingredients',
        desc: 'Digitory sends low-stock alerts before ingredients finish. The system also recommends when it\'s time to reorder based on your daily usage.'
      }
    ],
    featuresTitle: 'Better control over every ingredient',
    features: [
      {
        title: 'Recipe connection',
        desc: 'Every recipe is connected to your inventory. When you sell a pizza, coffee, dosa, or cocktail, the exact ingredients used are updated automatically. This helps you track ingredient usage, maintain consistent portions, and understand food costs.'
      },
      {
        title: 'Manage multiple outlets with ease',
        desc: 'Whether you have one restaurant or many locations, Digitory keeps all your inventory connected. View stock across all outlets, transfer inventory between locations, track your central kitchen, and manage supplier deliveries.'
      },
      {
        title: 'Reduce stock loss and theft',
        desc: 'Inventory losses don\'t always happen because of wastage. Digitory helps you spot unusual stock differences, compare sales with inventory usage, and control who can access inventory data.'
      }
    ],
    businessTypes: [
      { name: 'Restaurants', desc: 'Track ingredients automatically, monitor suppliers, and manage changing menus with confidence.' },
      { name: 'Bars', desc: 'Track liquor by volume, monitor bottle usage, record breakages, and manage stock more accurately.' },
      { name: 'Breweries', desc: 'Manage raw materials, brewing batches, packaging stock, and production planning from one system.' },
      { name: 'Cafés', desc: 'Track fast-moving ingredients, connect with your central kitchen, and stay prepared for busy hours.' },
      { name: 'Cloud Kitchens', desc: 'Manage inventory across multiple brands and delivery locations while keeping stock updated in real time.' }
    ],
    extraGrowth: {
      title: 'Make better business decisions',
      desc: 'Digitory gives you simple reports that help you understand your inventory. See your most-used ingredients, fast-moving stock, slow-moving stock, food wastage, purchase history, stock value, and inventory trends to make smarter purchasing decisions.'
    },
    extraOwnersChoice: {
      title: 'Easy to use. Easy to grow with.',
      desc: 'Whether you\'re opening your first café or managing a growing restaurant chain, Digitory grows with your business. As your operations become bigger, your inventory stays organised and easy to manage.'
    },
    ctaBlock: {
      title: 'Spend less time counting stock',
      desc: 'Inventory shouldn\'t be stressful. Digitory helps you reduce manual work, lower food waste, avoid stock shortages, and keep every ingredient under control. That means you can spend less time managing inventory and more time running your restaurant.'
    }
  },
  {
    slug: 'reports',
    shortLabel: 'Live Dashboard',
    title: 'Live Business Dashboard',
    badge: '04 • Reports',
    subtitle: 'See how your restaurant is performing at any moment',
    description: 'Sales, orders, inventory, customer visits, and staff performance all tell you how your business is doing. Digitory brings all this information together in one place, so you can understand your restaurant better and make smarter decisions. Whether you have one outlet or many, Digitory gives you the insights you need to grow your business.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.',
    icon: '',
    whyChoose: [
      {
        title: 'See your business in one dashboard',
        desc: 'View your sales, orders, inventory, and other important numbers from one simple dashboard. Instead of checking different reports, everything you need is available in one place.'
      },
      {
        title: 'Get live updates',
        desc: 'Your dashboard updates in real time. Check sales, orders, and restaurant performance as they happen, so you can respond quickly whenever needed.'
      },
      {
        title: 'Reports that fit your business',
        desc: 'Every restaurant is different. Digitory lets you create reports based on the information that matters most to your business.'
      },
      {
        title: 'Compare all your outlets',
        desc: 'Running multiple locations becomes much easier. View each outlet\'s performance from one dashboard and quickly identify which locations are doing well.'
      }
    ],
    featuresTitle: 'Understand your restaurant better',
    features: [
      {
        title: 'Track your sales',
        desc: 'See how much your restaurant earns every day, week, or month. Understand which days are busiest and monitor your business growth over time.'
      },
      {
        title: 'Learn how customers spend',
        desc: 'Find out the average amount customers spend on each visit and on every order. This helps you create better offers and improve your menu.'
      },
      {
        title: 'Understand what sells best',
        desc: 'See which dishes and drinks are your top performers. Use this information to improve your menu and focus on items that bring in more revenue.'
      },
      {
        title: 'Monitor taxes and revenue',
        desc: 'View your total sales, taxes, service charges, and overall revenue in clear, easy-to-read reports. Everything is organised.'
      }
    ],
    businessTypes: [
      { name: 'Restaurants', desc: 'Track sales, customer preferences, and staff performance to improve daily operations.' },
      { name: 'Quick Service Restaurants (QSRs)', desc: 'Monitor high-volume sales, improve pricing, and keep inventory under control.' },
      { name: 'Cafés', desc: 'Understand customer buying habits, track popular products, and build stronger customer loyalty.' },
      { name: 'Bars & Pubs', desc: 'Monitor food and liquor sales, identify peak business hours, and improve inventory planning.' },
      { name: 'Multi-outlet chains', desc: 'Manage reports from all your outlets in one place and compare performance across locations with ease.' }
    ],
    extraGrowth: {
      title: 'Make better business decisions',
      desc: 'Digitory\'s reports help you answer important questions like: Which dishes sell the most? Which outlet performs best? When are your busiest hours? Which products generate the highest revenue? How is your inventory performing? How are your staff members performing? With the right information, making decisions becomes much easier.'
    },
    extraOwnersChoice: {
      title: 'Grow with confidence',
      desc: 'Whether you\'re opening your first restaurant or managing a growing chain, Digitory grows with your business. Your reports stay organised, your data stays connected, and your team always has the information they need.'
    },
    ctaBlock: {
      title: 'Turn your data into better decisions',
      desc: 'Running a successful restaurant isn\'t about guessing. It\'s about understanding what\'s working and improving what isn\'t. Digitory\'s Analytics & Reporting System gives you clear insights into your business, helping you increase sales, improve efficiency, and make better decisions every day.'
    }
  },
  {
    slug: 'control-system',
    shortLabel: 'Multi-Outlet Management',
    title: 'Multi-Outlet Management',
    badge: '05 • Control System',
    subtitle: 'Managing food and liquor stock across outlets shouldn\'t be difficult',
    description: 'Digitory\'s Food & Liquor Control System helps you keep track of every ingredient and every bottle with accuracy. Know what you have in stock, reduce waste, and make better business decisions with real-time updates. Whether you run a restaurant, bar, brewery, pub, or café, Digitory helps you stay in control every day.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by restaurants, bars, breweries, and cafés across India.',
    icon: '',
    whyChoose: [
      {
        title: 'Track every bottle and ingredient accurately',
        desc: 'Know exactly how much stock you have at any time. Track food ingredients and liquor inventory with precision to reduce losses and avoid costly mistakes.'
      },
      {
        title: 'See live inventory updates',
        desc: 'Your inventory updates automatically as items are sold. You always know what\'s available, what\'s running low, and what needs to be reordered.'
      },
      {
        title: 'Save time with automatic reports',
        desc: 'No more manual stock calculations. Digitory creates inventory reports automatically, helping you understand your stock without spending hours on paperwork.'
      },
      {
        title: 'Keep complete inventory records',
        desc: 'Every stock movement is recorded automatically. This makes it easy to check inventory history, review transactions, and stay prepared for audits whenever needed.'
      }
    ],
    featuresTitle: 'Everything you need to manage food and liquor inventory',
    features: [
      {
        title: 'Accurate liquor tracking',
        desc: 'Track liquor inventory with greater accuracy to reduce stock differences and improve control over your bar. Know exactly what\'s available and identify losses.'
      },
      {
        title: 'Real-time stock management',
        desc: 'Every sale updates your inventory instantly. This helps your team restock on time, avoid shortages, and keep service running smoothly.'
      },
      {
        title: 'Automatic inventory reports',
        desc: 'Get clear reports on stock levels, usage, purchases, and inventory movement. Spend less time creating reports.'
      },
      {
        title: 'Better inventory control',
        desc: 'Monitor every item coming in and going out. With complete inventory records, it\'s easier to find errors, prevent losses, and keep operations organised.'
      }
    ],
    businessTypes: [
      { name: 'Restaurants', desc: 'Keep ingredients organised, reduce food waste, and manage inventory with confidence.' },
      { name: 'Bars', desc: 'Track liquor stock accurately, reduce bottle losses, and improve inventory control.' },
      { name: 'Breweries', desc: 'Manage raw materials, finished products, and daily stock movement from one system.' },
      { name: 'Pubs', desc: 'Handle busy service hours while keeping food and liquor inventory updated automatically.' },
      { name: 'Cafés', desc: 'Track fast-moving ingredients and always know what\'s available during peak hours.' }
    ],
    extraGrowth: {
      title: 'How Digitory helps your business',
      desc: 'Reduce food and liquor waste, improve profits, save time, and stay organised. Smarter decisions are made easy using simple reports on stock usage, buying patterns, and sales performance.'
    },
    extraOwnersChoice: {
      title: 'Easy to use. Easy to grow with.',
      desc: 'Whether you have one outlet or a growing chain, Digitory helps you manage inventory without making things more complicated. As your business grows, your stock stays organised, accurate, and easy to manage from one place.'
    },
    ctaBlock: {
      title: 'Take control of your inventory',
      desc: 'When you know exactly what\'s happening in your kitchen and bar, running your business becomes much easier. Digitory\'s Food & Liquor Control System helps you reduce waste, improve accuracy, save time, and keep your inventory under control every day.'
    }
  },
  {
    slug: 'event-management',
    shortLabel: 'Event Management',
    title: 'One Connected System',
    badge: '06 • Event System',
    subtitle: 'Managing events should be simple, even when the crowd is large',
    description: 'Digitory\'s Cashless Event & Entry Management System helps you manage guest entry, payments, registrations, and event operations from one simple platform. Guests can enter quickly, pay digitally, and enjoy a smooth event experience without long queues. Whether you\'re hosting a private party, a live concert, a brewery event, or a nightclub night, Digitory helps your team stay organised from start to finish.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by restaurants, bars, breweries, cafés, and event venues across India.',
    icon: '',
    whyChoose: [
      {
        title: 'Fast and secure check-ins',
        desc: 'Guests can check in quickly using RFID cards, NFC bands, QR codes, or digital passes. This helps reduce waiting time and keeps entry moving smoothly.'
      },
      {
        title: 'Quick cashless payments',
        desc: 'Guests can make payments without carrying cash. Digital payments are faster, safer, and help your team serve customers more efficiently.'
      },
      {
        title: 'Easy registration',
        desc: 'Register guests in just a few steps. Reduce manual work, avoid errors, and make the entry process simple for both your staff and your guests.'
      },
      {
        title: 'Better crowd management',
        desc: 'Manage large crowds without confusion. Track guest entry, monitor event capacity, and keep everything organised from one dashboard.'
      }
    ],
    featuresTitle: 'Everything you need to run successful events',
    features: [
      {
        title: 'Contactless guest entry',
        desc: 'Allow guests to enter the event quickly with secure digital check-ins. No paper tickets. No unnecessary delays.'
      },
      {
        title: 'Smooth cashless payments',
        desc: 'Guests can pay for food, drinks, and other purchases using digital payment methods. This reduces cash handling and speeds up service across the venue.'
      },
      {
        title: 'Faster event operations',
        desc: 'Digitory connects guest registration, entry management, billing, and payments into one system. Your team spends less time managing operations and more time serving guests.'
      },
      {
        title: 'Better bar and counter management',
        desc: 'Handle busy food and beverage counters with faster billing and quicker order processing. Serve more guests while reducing waiting time during peak hours.'
      }
    ],
    businessTypes: [
      { name: 'Restaurants', desc: 'Manage birthday parties, anniversaries, corporate events, and private functions with ease.' },
      { name: 'Bars & Nightclubs', desc: 'Control guest entry, manage busy crowds, and handle cashless payments throughout the night.' },
      { name: 'Cafés', desc: 'Host workshops, live music events, and pop-up experiences with faster registrations and digital payments.' },
      { name: 'Multi-outlet businesses', desc: 'Manage events across different locations while viewing reports and performance from one dashboard.' }
    ],
    extraGrowth: {
      title: 'Benefits for your business',
      desc: 'Improve the guest experience with shorter queues, run events more efficiently to reduce manual work, increase event revenue through quick payments, and track guest activity via reports to make smarter future event planning decisions.'
    },
    extraOwnersChoice: {
      title: 'Easy to connect with your existing systems',
      desc: 'Digitory works with your existing POS system, payment gateways, loyalty programs, and ticketing platforms. Everything stays connected, making event management simple for your team.'
    },
    ctaBlock: {
      title: 'Make every event smooth from start to finish',
      desc: 'A successful event starts with a great guest experience. When entry is fast, payments are easy, and your team stays organised, everyone enjoys the event more. Digitory\'s Cashless Event & Entry Management System helps you manage events with confidence while giving every guest a faster and smoother experience.'
    }
  },
  {
    slug: 'qr-ordering',
    shortLabel: 'QR Ordering',
    title: 'QR Dine-in Ordering',
    badge: '07 • QR',
    subtitle: 'Self-ordering from tables via QR codes',
    description: 'Let your guests view the menu, customize their dishes, and order directly from their tables. Connects directly to POS and KDS to turn tables faster.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by modern cafés and QSRs across India.',
    icon: '',
    whyChoose: [
      {
        title: 'Faster table turnaround',
        desc: 'Reduce time spent taking orders manually and waiting for staff availability, letting customers order instantly.'
      }
    ],
    featuresTitle: 'Dine-in self ordering capabilities',
    features: [
      {
        title: 'Direct-to-kitchen routing',
        desc: 'Skip order taking delay. Selected recipes send instantly to prep screens.'
      }
    ],
    businessTypes: [
      { name: 'Cafés', desc: 'Great for small spaces looking to process billing counter queues.' }
    ],
    ctaBlock: {
      title: 'Upgrade your dining experience',
      desc: 'Setup QR codes at tables today.'
    }
  },
  {
    slug: 'loyalty',
    shortLabel: 'Loyalty & CRM',
    title: 'CRM & Loyalty Hub',
    badge: '08 • Loyalty',
    subtitle: 'Build lasting relationships with customer point profiles',
    description: 'Great food brings people in. A great experience brings them back. Digitory\'s CRM & Loyalty Software helps you build better relationships with your customers. Reward loyal guests, stay connected through WhatsApp and SMS, collect feedback, and encourage repeat visits, all from one easy platform. Whether you own one cafe or manage many outlets, Digitory helps you keep customers coming back.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.',
    icon: '',
    whyChoose: [
      {
        title: 'Made for restaurants',
        desc: 'Digitory is built for the food and beverage industry. It understands dine-in, takeaway, delivery, walk-ins, and online orders, so you don\'t have to adjust a generic CRM to fit your business.'
      },
      {
        title: 'Know every customer',
        desc: 'Every visit, order, and interaction is saved in one customer profile. See favourite dishes, order history, spending habits, and visit frequency so you can serve every customer better.'
      },
      {
        title: 'Reward loyalty',
        desc: 'Create loyalty programs that customers actually enjoy. Reward them with points, free dishes, discounts, birthday offers, or special memberships that encourage repeat visits.'
      },
      {
        title: 'Listen to your customers',
        desc: 'Collect feedback after every order through WhatsApp or simple surveys. Find problems early, improve service, and encourage happy customers to leave online reviews.'
      }
    ],
    featuresTitle: 'Everything you need in one CRM',
    features: [
      {
        title: 'One customer database',
        desc: 'Bring together customer details from dine-in, delivery apps, QR ordering, websites, and online orders into one place. No duplicate records.'
      },
      {
        title: 'Flexible loyalty programs',
        desc: 'Build loyalty programs that suit your restaurant. Reward customers based on money spent, number of visits, membership levels, referrals, or special campaigns.'
      },
      {
        title: 'WhatsApp, SMS & Email',
        desc: 'Send personalised messages based on customer behaviour. Share offers, rewards, reminders, and updates with the right customers at the right time.'
      },
      {
        title: 'Smart customer groups',
        desc: 'Create customer groups such as regulars, high spenders, new customers, inactive customers, and birthday month customers to run better marketing campaigns.'
      }
    ],
    businessTypes: [
      { name: 'Restaurants', desc: 'Reward regular guests, remember customer preferences, and encourage repeat dining.' },
      { name: 'Bars', desc: 'Promote events, reward loyal customers, and keep guests coming back.' },
      { name: 'Breweries', desc: 'Create loyalty programs for beer lovers, launch seasonal offers, and reward repeat visitors.' },
      { name: 'Pubs', desc: 'Run birthday offers, happy hour promotions, and event campaigns with ease.' },
      { name: 'Cafés', desc: 'Offer digital stamp cards, student offers, and seasonal rewards to increase repeat visits.' },
      { name: 'Ice Cream Parlours & Dessert Shops', desc: 'Create family rewards, birthday offers, and loyalty programs that work across multiple outlets.' }
    ],
    extraGrowth: {
      title: 'Marketing that runs automatically',
      desc: 'Stay connected without extra effort. Automatically send birthday wishes, \'We Miss You\' offers, reward notifications, event invitations, and special discounts.'
    },
    extraOwnersChoice: {
      title: 'Why restaurants choose Digitory CRM',
      desc: 'Digitory works with your POS, KDS, delivery apps, and online ordering. It is a cloud-based system accessible from anywhere, easy to use with minimal training, built for Indian restaurants, and proven to increase repeat customers.'
    },
    ctaBlock: {
      title: 'Build your loyal customer base',
      desc: 'Stop relying on third-party platforms. Build direct relationships with your diners and reward them for choosing you with Digitory CRM.'
    }
  },
  {
    slug: 'booking',
    shortLabel: 'Waitlist & Booking',
    title: 'Waitlist & Booking',
    badge: '09 • Booking',
    subtitle: 'Coordinate reservation requests and seat guests quickly',
    description: 'Digitory\'s Table Booking & Reservation System helps you manage reservations, walk-ins, and table availability from one place. Seat guests faster, reduce waiting time, and make better use of every table in your restaurant. Whether you run a café, fine dining restaurant, bar, or a multi-outlet chain, Digitory helps you deliver a smooth experience for both your guests and your staff.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.',
    icon: '',
    whyChoose: [
      {
        title: 'Manage tables more efficiently',
        desc: 'See which tables are available, occupied, or reserved in real time. This helps you seat guests faster and make the best use of your restaurant space.'
      },
      {
        title: 'Reduce waiting time',
        desc: 'Manage reservations and walk-in guests from one system. Your team can quickly assign tables and keep guests informed, creating a better dining experience.'
      },
      {
        title: 'Stay updated in real time',
        desc: 'Get instant updates whenever a reservation is made, changed, or cancelled. Your staff always knows the latest table status.'
      },
      {
        title: 'Connect everything together',
        desc: 'Digitory works with your POS and kitchen systems, so reservations, orders, and billing stay connected. This keeps your restaurant running smoothly from start to finish.'
      }
    ],
    featuresTitle: 'Everything you need to manage reservations',
    features: [
      {
        title: 'Smart table allocation',
        desc: 'Assign tables based on availability, group size, and reservations. Use your dining space more efficiently and reduce empty tables during busy hours.'
      },
      {
        title: 'Easy reservation management',
        desc: 'Manage online bookings and walk-ins from one simple dashboard. View upcoming reservations, update bookings, and handle cancellations in just a few clicks.'
      },
      {
        title: 'Instant reservation updates',
        desc: 'Whenever a booking changes, your team sees the update immediately. This helps avoid confusion and keeps service running smoothly.'
      },
      {
        title: 'Faster billing and payments',
        desc: 'Once guests finish their meal, billing and payment can be handled quickly through the connected POS system. This helps reduce delays and prepares tables for the next guests faster.'
      }
    ],
    businessTypes: [
      { name: 'Restaurants', desc: 'Manage reservations, walk-ins, and table assignments with ease while delivering a better dining experience.' },
      { name: 'Fine Dining', desc: 'Offer a premium guest experience with organised reservations and smooth table management.' },
      { name: 'Cafés', desc: 'Handle quick table turnover while serving both walk-in customers and advance bookings efficiently.' },
      { name: 'Bars & Breweries', desc: 'Manage busy evenings and weekend reservations while keeping tables available for incoming guests.' },
      { name: 'Multi-outlet chains', desc: 'View reservations across all your locations and manage bookings from one central dashboard.' }
    ],
    extraGrowth: {
      title: 'Benefits for your restaurant',
      desc: 'Give guests a better experience with faster seating, make better use of every table to improve table turnover, reduce missed bookings, and improve daily operations through connected systems.'
    },
    extraOwnersChoice: {
      title: 'Works with your existing systems',
      desc: 'Digitory connects with your POS system, kitchen management, CRM, and other restaurant tools. Everything works together, helping your team provide faster service with fewer manual tasks.'
    },
    ctaBlock: {
      title: 'Make every guest feel welcome',
      desc: 'Good table management means shorter waits, happier guests, and smoother restaurant operations. Digitory\'s Table Booking & Reservation System helps you organise reservations, manage tables more efficiently, and give every guest a better dining experience from the moment they book until they leave.'
    }
  },
  {
    slug: 'purchasing',
    shortLabel: 'Purchase & Supplier',
    title: 'Purchase & Supplier',
    badge: '10 • Purchasing',
    subtitle: 'Create purchase requests and manage active supplier invoices',
    description: 'Manage purchase requests, track supplier invoices, log goods receipt details, and track food ingredient price variations.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by restaurants across India.',
    icon: '',
    whyChoose: [
      {
        title: 'Centralized Supplier Logs',
        desc: 'Manage all supplier contacts, purchase history, and raw material pricing agreements in one connected system.'
      }
    ],
    featuresTitle: 'Supplier and purchasing tools',
    features: [
      {
        title: 'Digital PO workflows',
        desc: 'Draft, verify, and approve purchase orders digitally, reducing processing delays.'
      }
    ],
    businessTypes: [
      { name: 'Restaurants', desc: 'Keep ingredient ordering cycles smooth and consistent.' }
    ],
    ctaBlock: {
      title: 'Simplify supplier management',
      desc: 'Start optimizing food ingredient purchases.'
    }
  },
  {
    slug: 'payroll',
    shortLabel: 'Shift & Payroll',
    title: 'Shift & Payroll Hub',
    badge: '11 • Payroll',
    subtitle: 'Log worker attendance and configure monthly shift schedules',
    description: 'Log worker attendance checklists, configure monthly shift schedules, track server table zones, and manage salary reports.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by F&B managers across India.',
    icon: '',
    whyChoose: [
      {
        title: 'Simplified Shift Roster',
        desc: 'Design weekly rosters, allocate tables, track hourly attendance, and reduce payroll calculation efforts.'
      }
    ],
    featuresTitle: 'Staff scheduling and payroll features',
    features: [
      {
        title: 'Live shift attendance logs',
        desc: 'Employees check-in/out directly from the POS interface with secure access keys.'
      }
    ],
    businessTypes: [
      { name: 'Cafés', desc: 'Optimize part-time student staff schedules.' }
    ],
    ctaBlock: {
      title: 'Ready to automate staff payroll?',
      desc: 'Start optimizing staff schedules.'
    }
  },
  {
    slug: 'central-kitchen',
    shortLabel: 'Central Prep Kitchen',
    title: 'Central Prep Kitchen',
    badge: '12 • Central Kitchen',
    subtitle: 'Manage batch preparation formulas centrally',
    description: 'Manage batch preparation formulas, track raw material shipping to outlets, and maintain consistent dish recipes centrally.',
    ctaText: 'Request a Demo',
    trustText: 'Trusted by franchise chains across India.',
    icon: '',
    whyChoose: [
      {
        title: 'Consistent Recipe Prep',
        desc: 'Pre-prepare base sauces and pre-mixes centrally and dispatch to outlets, ensuring uniform taste.'
      }
    ],
    featuresTitle: 'Central prep kitchen workflows',
    features: [
      {
        title: 'Dispatch tracking logs',
        desc: 'Monitor stock dispatch status from central warehouses to outlets, avoiding shipment errors.'
      }
    ],
    businessTypes: [
      { name: 'Cloud Kitchens', desc: 'Maintain recipe consistency across multiple virtual restaurant brands.' }
    ],
    ctaBlock: {
      title: 'Standardize central prep kitchen',
      desc: 'Start managing central preparations batches.'
    }
  }
];

const seed = async () => {
  try {
    process.env.MONGO_URI = 'mongodb+srv://itbotpipes_db_user:HJf67IMSyFV0B9xs@cluster0.io0ygd6.mongodb.net/digitory?retryWrites=true&w=majority';
    await connectDB();
    
    // Clear old sample solutions
    await Solution.deleteMany({});
    console.log('Cleared all existing solutions from DB');

    await Solution.create(sampleSolutions);
    console.log('Successfully seeded database with all 12 solutions!');
    
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding solutions:', err);
    process.exit(1);
  }
};

seed();
