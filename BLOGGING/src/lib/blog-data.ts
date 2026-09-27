import personalImg from "@/assets/blog-personal.jpg";
import roadImg from "@/assets/blog-road.jpg";
import cyberImg from "@/assets/blog-cyber.jpg";
import emergencyImg from "@/assets/blog-emergency.jpg";
import campusImg from "@/assets/blog-campus.jpg";
import disasterImg from "@/assets/blog-disaster.jpg";

export type CategorySlug =
  | "personal-safety"
  | "road-safety"
  | "cyber-safety"
  | "emergency-preparedness"
  | "campus-safety"
  | "disaster-safety";

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  blurb: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "personal-safety",
    name: "Personal Safety",
    short: "Personal",
    blurb: "Daily habits and self-protection.",
    image: personalImg,
  },
  {
    slug: "road-safety",
    name: "Road Safety",
    short: "Road",
    blurb: "Driving, cycling, and transit safety.",
    image: roadImg,
  },
  {
    slug: "cyber-safety",
    name: "Cyber Safety",
    short: "Cyber",
    blurb: "Passwords, phishing, and devices.",
    image: cyberImg,
  },
  {
    slug: "emergency-preparedness",
    name: "Emergency Preparedness",
    short: "Emergency Preparedness",
    blurb: "Plans, kits, and drills.",
    image: emergencyImg,
  },
  {
    slug: "campus-safety",
    name: "Campus Safety",
    short: "Campus",
    blurb: "Safety for students and staff.",
    image: campusImg,
  },
  {
    slug: "disaster-safety",
    name: "Disaster Safety",
    short: "Disaster safety",
    blurb: "Natural hazards and response.",
    image: disasterImg,
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export type Blog = {
  slug: string;
  title: string;
  category: CategorySlug;
  excerpt: string;
  author: string;
  date: string;
  readMinutes: number;
  likes: number;
  image: string;
  body: string[];
  takeaways: string[];
};

export const blogs: Blog[] = [
  {
    slug: "home-emergency-plan",
    title: "The 10-minute home emergency plan most families never finish",
    category: "emergency-preparedness",
    excerpt:
      "A calm, step-by-step walkthrough for building a plan you will actually follow — from meeting points to a go-bag that fits in one drawer.",
    author: "Maya Okonkwo",
    date: "2025-03-14",
    readMinutes: 9,
    likes: 284,
    image: emergencyImg,
    body: [
      "Most emergency plans fail for a boring reason: they were never finished. A half-written list in a drawer does not help anyone at 2 a.m. The fix is to shrink the plan until it fits in ten minutes of work.",
      "Start with one decision: where does everyone meet if the home must be left quickly? Pick a spot outside the building that is visible, lit, and away from traffic. Say it out loud to everyone who lives with you. That single sentence is already a working plan.",
      "Next, write down three phone numbers on paper — a local emergency number, one neighbour, and one relative who lives in another city. Phones die and networks jam; paper does not.",
      "Then assemble a drawer-sized kit: water, a torch with spare batteries, a small first-aid pouch, copies of ID documents, and any daily medicine. You are not packing for a month, you are packing for the first few hours.",
      "Finally, put a reminder in your calendar every six months to check the kit. Batteries leak, medicines expire, and children outgrow shoes. A plan reviewed twice a year stays a plan; a plan reviewed never becomes a museum piece.",
    ],
    takeaways: [
      "Agree on one outdoor meeting point and say it aloud.",
      "Keep three emergency numbers on paper, not only in a phone.",
      "Review the kit every six months.",
    ],
  },
  {
    slug: "emergency-preparedness-checklist",
    title: "The preparedness checklist you can finish this weekend",
    category: "emergency-preparedness",
    excerpt:
      "Water, light, documents, medicine, cash. Five categories, twenty minutes each, and a household that is genuinely ready.",
    author: "Ibrahim Salko",
    date: "2025-03-01",
    readMinutes: 6,
    likes: 161,
    image: emergencyImg,
    body: [
      "Checklists work because they remove decisions from a moment when decisions are expensive. Build yours around five categories: water, light, documents, medicine, and cash.",
      "Water: store at least three litres per person per day for three days. Rotate it every six months so it never tastes like a science experiment.",
      "Light: one torch per person beats one bright lantern for the household. People separate during an emergency, and light that has to be shared is light that someone goes without.",
      "Documents: photograph ID cards, insurance papers, and property records. Keep one encrypted copy in cloud storage and one printed copy in a sealed pouch.",
      "Medicine and cash: a week of prescription medicine and small denominations of cash cover the two failures people rarely plan for — closed pharmacies and dead card machines.",
    ],
    takeaways: [
      "Three litres of water per person per day, for three days.",
      "One torch per person, not one per household.",
      "Keep a week of prescription medicine and small cash notes.",
    ],
  },
  {
    slug: "what-to-do-during-an-emergency",
    title: "What to actually do in the first ninety seconds",
    category: "emergency-preparedness",
    excerpt:
      "Stop, look, decide, move. A simple sequence that keeps you from freezing when something goes wrong.",
    author: "Maya Okonkwo",
    date: "2025-02-18",
    readMinutes: 5,
    likes: 133,
    image: emergencyImg,
    body: [
      "The first ninety seconds of an emergency are mostly wasted on disbelief. Naming a sequence in advance shortens that pause.",
      "Stop: take one breath before acting. A single breath is enough to stop a reflex from becoming a mistake.",
      "Look: identify the hazard and the nearest two exits. Two, because the nearest one is often the one everyone else is already crowding.",
      "Decide: choose to leave, to shelter, or to help. Trying to do all three at once is how people end up doing none of them.",
      "Move: act, then call for help once you are somewhere safer. In a real emergency, contact your local emergency services — this article is awareness, not a substitute for them.",
    ],
    takeaways: [
      "One breath before acting.",
      "Always identify two exits, not one.",
      "Pick a single action: leave, shelter, or help.",
    ],
  },
  {
    slug: "phishing-tells",
    title: "Recognizing a phishing message in three tells",
    category: "cyber-safety",
    excerpt:
      "Urgency, an odd sender address, and a link that does not match its label. Learn the pattern once and most scams stop working.",
    author: "Aisha Bello",
    date: "2025-02-27",
    readMinutes: 5,
    likes: 412,
    image: cyberImg,
    body: [
      "Phishing does not rely on clever technology. It relies on hurry. Almost every phishing message shares the same three tells.",
      "Tell one — manufactured urgency. Your account will be closed, your parcel will be returned, your scholarship will lapse. Real institutions rarely give you fifteen minutes to act.",
      "Tell two — a sender address that is almost right. Look past the display name at the actual domain. A letter swapped, a hyphen added, or a public mail domain where a company domain belongs is the whole scam.",
      "Tell three — a link whose label and destination disagree. Hover on desktop, long-press on mobile, and read the domain before the first single slash. That is the only part that decides where you land.",
      "When a message passes all three tests and you are still unsure, do not use its links. Open the service yourself from a bookmark or type the address by hand.",
    ],
    takeaways: [
      "Urgency is a red flag, not a reason to hurry.",
      "Read the sender's domain, not the display name.",
      "Check a link's real destination before tapping it.",
    ],
  },
  {
    slug: "password-hygiene-for-students",
    title: "Password hygiene for busy students",
    category: "cyber-safety",
    excerpt:
      "Long passphrases, one password manager, and two-factor authentication on the three accounts that matter most.",
    author: "Dev Rao",
    date: "2025-03-10",
    readMinutes: 6,
    likes: 356,
    image: cyberImg,
    body: [
      "Length beats complexity. A four-word passphrase you can remember is stronger than a scrambled eight-character password you have to reset monthly.",
      "Never reuse passwords across accounts. One leaked forum from years ago is how attackers get into a current email account, and email is the master key to everything else.",
      "Use a password manager. It replaces twenty remembered secrets with one, and it will not autofill on a look-alike domain — which quietly protects you from phishing too.",
      "Turn on two-factor authentication on your email, your bank, and your university portal first. An app-based code or a hardware key is meaningfully stronger than an SMS code.",
      "Review the recovery options on your main email once a year. An out-of-date recovery phone number is the most common reason people lose an account permanently.",
    ],
    takeaways: [
      "Use a four-word passphrase over a scrambled short one.",
      "Never reuse a password across two accounts.",
      "Enable two-factor authentication on email first.",
    ],
  },
  {
    slug: "social-media-privacy",
    title: "The social media privacy check worth doing twice a year",
    category: "cyber-safety",
    excerpt:
      "Location tags, friend-of-friend visibility, and old posts. Fifteen minutes of settings work shrinks your public footprint.",
    author: "Aisha Bello",
    date: "2025-02-08",
    readMinutes: 7,
    likes: 197,
    image: cyberImg,
    body: [
      "Oversharing rarely happens in one dramatic post. It accumulates — a tagged location here, a visible friend list there, a photo of a hostel room with the door number in frame.",
      "Start with location. Turn off automatic location tagging, and avoid posting where you are while you are still there.",
      "Next, audit visibility. Friend-of-friend is a much larger audience than it sounds; on a campus network it is effectively public.",
      "Then look backwards. Old posts were written for a different life stage and a smaller audience. Bulk-limiting past posts is a single setting on most platforms.",
      "Finally, check which apps have access to your account. Revoke anything you have not deliberately used in the last year.",
    ],
    takeaways: [
      "Never post your location while you are still there.",
      "Friend-of-friend visibility is close to public.",
      "Revoke third-party app access you no longer use.",
    ],
  },
  {
    slug: "online-scam-awareness",
    title: "Online scams that target students first",
    category: "cyber-safety",
    excerpt:
      "Fake internships, fee-refund messages, and part-time work that asks you to pay up front. What the patterns have in common.",
    author: "Dev Rao",
    date: "2025-01-29",
    readMinutes: 6,
    likes: 178,
    image: cyberImg,
    body: [
      "Scams aimed at students exploit two things: limited money and a hurry to build a résumé. Most of them reduce to one question — is money moving towards a stranger?",
      "Fake internships ask for a registration or training fee. Legitimate employers do not charge you to work for them.",
      "Fee-refund messages arrive just after a real deadline, claiming an overpayment. They ask for card details or a one-time code. No refund needs your card's security code.",
      "Task-based part-time work starts with small real payouts, then requires you to deposit money for a larger batch. The early payouts are the bait.",
      "Slow the conversation down. Verify through an official channel you found yourself, and never share a one-time code with anyone, including someone claiming to be support staff.",
    ],
    takeaways: [
      "No real job charges you a fee to start.",
      "A refund never needs your card's security code.",
      "Never share a one-time code with anyone.",
    ],
  },
  {
    slug: "walking-alone-at-night",
    title: "Walking alone at night: a calm routine",
    category: "personal-safety",
    excerpt:
      "A route decided in advance, one person who knows it, and attention where it belongs — not on your screen.",
    author: "Priya Nair",
    date: "2025-03-08",
    readMinutes: 6,
    likes: 321,
    image: personalImg,
    body: [
      "Confidence at night comes from preparation, not bravado. Decide your route before you leave, and prefer lit, populated streets over the shortest path.",
      "Tell one person where you are going and when you expect to arrive. Live location sharing with a single trusted contact does this automatically.",
      "Keep both ears available. One earphone out, or none in, is the cheapest awareness upgrade available.",
      "Walk with your phone in your pocket rather than in your hand. A lit screen advertises both distraction and a valuable object.",
      "If something feels wrong, act on it early. Cross the road, step into an open shop, or call someone and keep walking. Trusting the feeling early costs nothing.",
    ],
    takeaways: [
      "Choose a lit route over a short route.",
      "Share your route with one trusted contact.",
      "Keep at least one ear free.",
    ],
  },
  {
    slug: "traveling-alone-safely",
    title: "How to stay safe while travelling alone",
    category: "personal-safety",
    excerpt:
      "Offline maps, a check-in schedule, and a first-day plan that does not depend on a working phone.",
    author: "Tomas Vega",
    date: "2025-02-21",
    readMinutes: 8,
    likes: 244,
    image: personalImg,
    body: [
      "Solo travel is mostly logistics. Download offline maps before you leave, and screenshot your accommodation address in the local language.",
      "Agree a check-in schedule with someone at home: a short message on arrival and one each evening. A missed check-in is useful information.",
      "Arrive in daylight when you can. Most uncomfortable travel situations start with an unfamiliar area in the dark.",
      "Split your money and documents across two places. A lost bag then becomes an inconvenience rather than an emergency.",
      "Learn the local emergency number before you land, and write it down. It is different almost everywhere.",
    ],
    takeaways: [
      "Download offline maps and your address in the local language.",
      "Keep a daily check-in schedule with someone at home.",
      "Learn the local emergency number before arriving.",
    ],
  },
  {
    slug: "situational-awareness-basics",
    title: "Basic situational awareness, without the paranoia",
    category: "personal-safety",
    excerpt:
      "Awareness is a habit of noticing exits, baselines, and changes — not a state of constant alarm.",
    author: "Priya Nair",
    date: "2025-01-18",
    readMinutes: 5,
    likes: 209,
    image: personalImg,
    body: [
      "Situational awareness is often described as vigilance. It is closer to curiosity: noticing what normal looks like, so that abnormal stands out.",
      "When you enter a space, find the exits once. That single glance costs two seconds and removes the need to search later.",
      "Notice the baseline. In a calm café, people look relaxed and sound even. A change in that baseline — sudden quiet, movement towards one point — is worth a look up.",
      "Watch hands and direction of travel rather than faces. Both tell you more about intent than an expression does.",
      "Awareness is sustainable only if it is light. Two or three deliberate glances in a new space beat an hour of tension.",
    ],
    takeaways: [
      "Find the exits once when you enter a space.",
      "Learn the baseline so changes stand out.",
      "Keep awareness light enough to sustain.",
    ],
  },
  {
    slug: "essential-road-safety-rules",
    title: "Essential road safety rules people quietly forget",
    category: "road-safety",
    excerpt:
      "Speed, distance, and visibility do most of the work. The rest is resisting the urge to check your phone.",
    author: "Lena Fischer",
    date: "2025-03-05",
    readMinutes: 7,
    likes: 268,
    image: roadImg,
    body: [
      "Road safety is a numbers game. Stopping distance grows faster than speed does, so a small reduction in speed buys a large margin.",
      "Keep a three-second gap to the vehicle ahead, and double it in rain. Count the seconds against a fixed roadside object rather than guessing the distance.",
      "Be visible. Headlights at dusk are for other people to see you, not only for you to see the road.",
      "Indicate early and completely. A signal given while already turning communicates nothing useful.",
      "Put the phone out of reach. Hands-free is not attention-free, and a two-second glance at a message covers tens of metres blind.",
    ],
    takeaways: [
      "Keep a three-second gap; double it in rain.",
      "Use headlights at dusk so others can see you.",
      "Put the phone out of reach, not just out of hand.",
    ],
  },
  {
    slug: "pedestrian-safety",
    title: "Pedestrian safety at crossings and blind corners",
    category: "road-safety",
    excerpt:
      "Make eye contact, step out only when a vehicle has visibly slowed, and treat reversing vehicles as blind.",
    author: "Lena Fischer",
    date: "2025-02-12",
    readMinutes: 5,
    likes: 154,
    image: roadImg,
    body: [
      "A marked crossing is a legal right, not a physical shield. Step out only once a vehicle has visibly slowed.",
      "Make eye contact with the driver when you can. A driver who has not looked at you has not seen you.",
      "At blind corners and between parked vehicles, assume you are invisible until you can see the driver's mirror.",
      "Walk facing traffic where there is no footpath. It gives you the option to step aside.",
      "At night, wear or carry something reflective. Drivers see reflected light far sooner than they see dark clothing.",
    ],
    takeaways: [
      "Cross only when a vehicle has visibly slowed.",
      "If you cannot see the mirror, the driver cannot see you.",
      "Carry something reflective at night.",
    ],
  },
  {
    slug: "helmet-and-seatbelt",
    title: "Helmets and seat belts: the least glamorous habit that works",
    category: "road-safety",
    excerpt:
      "Correct fit matters as much as wearing one at all. A loose helmet or a twisted belt does a fraction of its job.",
    author: "Rahul Menon",
    date: "2025-01-24",
    readMinutes: 5,
    likes: 187,
    image: roadImg,
    body: [
      "Wearing protection is the decision; wearing it correctly is the outcome. A helmet that moves when you shake your head will move in a fall too.",
      "Fasten the chin strap so only two fingers fit underneath. An unbuckled helmet leaves before the impact arrives.",
      "Replace a helmet after any significant impact, even when it looks intact. The protective liner compresses once.",
      "In a car, the lap belt sits across the hips, not the stomach, and the shoulder belt crosses the collarbone, not the neck. A twisted belt concentrates force into a narrow line.",
      "Rear seats need belts too. An unbelted rear passenger is a hazard to everyone in front of them.",
    ],
    takeaways: [
      "Two fingers under the chin strap, no more.",
      "Replace a helmet after any real impact.",
      "Belt up in rear seats as well.",
    ],
  },
  {
    slug: "staying-safe-on-campus",
    title: "Dorm and campus safety: the habits that stick",
    category: "campus-safety",
    excerpt:
      "Locked doors, a buddy for late labs, and knowing which number to call before you need it.",
    author: "Nadia Haq",
    date: "2025-03-03",
    readMinutes: 6,
    likes: 231,
    image: campusImg,
    body: [
      "Campus safety is mostly repetition. Lock the door even for a five-minute errand; most opportunistic theft happens in that window.",
      "Save your campus security number in your phone and write it on a card in your wallet. Knowing it exists is not the same as being able to find it at midnight.",
      "For late-night labs or library sessions, agree a buddy system. Leaving together is more effective than any device.",
      "Learn the lit routes across campus and use them, even when they are longer.",
      "Report broken lights, jammed doors, and faulty alarms. Small maintenance failures are how unsafe spaces form.",
    ],
    takeaways: [
      "Lock the door even for short errands.",
      "Save campus security's number before you need it.",
      "Use the lit route, even if it is longer.",
    ],
  },
  {
    slug: "hostel-safety",
    title: "Hostel safety when you share a space with strangers",
    category: "campus-safety",
    excerpt:
      "Valuables out of sight, one person who knows your plans, and a clear line about who you let into your room.",
    author: "Nadia Haq",
    date: "2025-02-05",
    readMinutes: 5,
    likes: 142,
    image: campusImg,
    body: [
      "Shared living works on small, consistent boundaries. Keep documents, cash, and devices in a locked drawer rather than on a desk.",
      "Do not prop open corridor or entrance doors, however briefly. A propped door defeats every other control in the building.",
      "Tell a roommate or friend when you expect to be back if you are going out late.",
      "Be deliberate about who you let in. You are not obliged to admit someone you do not know because they say they live upstairs.",
      "Know the fire exits from your own floor, and count the doors between your room and the stairs. In smoke you may have to feel your way.",
    ],
    takeaways: [
      "Lock valuables away rather than leaving them in view.",
      "Never prop open an entrance door.",
      "Count the doors between your room and the stairs.",
    ],
  },
  {
    slug: "reporting-unsafe-situations",
    title: "Reporting an unsafe situation without second-guessing yourself",
    category: "campus-safety",
    excerpt:
      "What to write down, who to tell, and why an early low-stakes report is usually the most useful one.",
    author: "Ellis Moreau",
    date: "2025-01-15",
    readMinutes: 6,
    likes: 168,
    image: campusImg,
    body: [
      "People delay reporting because they are unsure whether something counts. Early reports of small things are exactly what prevention depends on.",
      "Write down the facts while they are fresh: date, time, place, what was said or done, and who else was present. Keep your interpretation separate from the observation.",
      "Know your options. Most institutions have more than one channel — security, a student welfare office, a designated officer, and an anonymous form.",
      "Ask what happens next and request it in writing. A record protects you as much as it informs anyone else.",
      "If you are supporting someone else, ask what they want before acting. Support that removes a person's choices rarely helps them.",
    ],
    takeaways: [
      "Record facts and interpretation separately.",
      "Learn all reporting channels, including anonymous ones.",
      "Ask what a person wants before reporting for them.",
    ],
  },
  {
    slug: "go-bag-essentials",
    title: "What actually belongs in a go-bag",
    category: "disaster-safety",
    excerpt:
      "Twelve items that earn their weight, and the popular additions you can safely leave behind.",
    author: "Tomas Vega",
    date: "2025-03-02",
    readMinutes: 8,
    likes: 302,
    image: disasterImg,
    body: [
      "A go-bag is a seventy-two-hour bag, not a survival fantasy. Weight is the constraint, so every item must earn its place.",
      "Carry water and a way to refill it, high-calorie food that needs no cooking, a torch, a power bank, a first-aid pouch, and any daily medicine.",
      "Add copies of documents, a little cash in small notes, a warm layer, sturdy shoes, a dust mask, and a whistle. A whistle carries far further than a voice and costs no energy.",
      "Leave behind the large knife, the second set of clothes, and the heavy multi-tool. They are the first things people abandon on foot.",
      "Store the bag where you can reach it without going deeper into the building, and check it every six months.",
    ],
    takeaways: [
      "Pack for seventy-two hours, not for a month.",
      "A whistle outperforms shouting at a fraction of the effort.",
      "Store the bag near your exit, not in a back room.",
    ],
  },
  {
    slug: "fire-safety-at-home",
    title: "Fire safety: the two minutes that decide the outcome",
    category: "disaster-safety",
    excerpt:
      "Working alarms, a practised exit, and staying low. Fire moves faster than most people expect.",
    author: "Ellis Moreau",
    date: "2025-02-14",
    readMinutes: 6,
    likes: 258,
    image: disasterImg,
    body: [
      "A house fire can become untenable in roughly two minutes. Every part of fire safety is about spending those minutes well.",
      "Test smoke alarms monthly and replace batteries yearly. An alarm with a dead battery is a decoration.",
      "Practise the exit, including a second route. Walking it once in daylight makes it findable in darkness.",
      "Stay low, below the smoke, and close doors behind you. A closed door buys minutes.",
      "Never go back inside for belongings, and never use a lift. Call the fire service from outside and stay out.",
    ],
    takeaways: [
      "Test alarms monthly; replace batteries yearly.",
      "Close doors behind you as you leave.",
      "Never re-enter for belongings.",
    ],
  },
  {
    slug: "earthquake-and-flood",
    title: "Earthquake and flood: what to do in the moment",
    category: "disaster-safety",
    excerpt:
      "Drop, cover, hold on — then check for hazards. For water, move up and away early rather than waiting for certainty.",
    author: "Sam Whitfield",
    date: "2025-01-20",
    readMinutes: 7,
    likes: 211,
    image: disasterImg,
    body: [
      "During an earthquake, drop, cover, and hold on. Running for a doorway during shaking causes more injuries than staying put under sturdy cover.",
      "After the shaking, expect aftershocks. Check yourself and others for injuries, then look for gas smells, broken glass, and damaged wiring before moving around.",
      "For floods, elevation and time matter more than certainty. Moving up and away early is cheap; waiting for confirmation is not.",
      "Never walk or drive through moving water. Ankle-deep moving water can take your footing, and the road beneath may already be gone.",
      "In extreme weather, charge devices early, fill containers with clean water, and keep a battery radio. Power tends to fail before you are ready for it.",
    ],
    takeaways: [
      "Drop, cover, hold on — do not run during shaking.",
      "Move up and away early in a flood.",
      "Never enter moving water on foot or by vehicle.",
    ],
  },
];

export function getBlog(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const quickTips: string[] = [
  "Keep a charged power bank and a printed copy of your emergency contacts in your bag.",
  "Set a weekly 10-minute check: smoke alarms, expiry dates, and a full phone backup.",
  "Share your live location with one trusted person before long or solo trips.",
  "Save your local emergency number and campus security number in your phone today.",
  "Photograph your ID and insurance documents and store one copy offline.",
  "Agree on one outdoor meeting point with the people you live with.",
];
