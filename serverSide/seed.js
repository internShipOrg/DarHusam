const mongoose = require("mongoose");
const Article = require("./models/Article");
const Event = require("./models/Event");
const Media = require("./models/Media");
const path = require("path");
const fs = require("fs");

// Connect to MongoDB
const connectDB = require("./config/db");
connectDB();
// Clear existing data
async function clearData() {
  try {
    await Article.deleteMany({});
    await Event.deleteMany({});
    await Media.deleteMany({});
    console.log("Existing data cleared");
  } catch (err) {
    console.error("Error clearing data:", err);
  }
}

// Seed test data
async function seedData() {
  try {
    // Create test articles
    const articles = await Article.insertMany([
      {
        title: "تقرير عن المؤتمر السنوي",
        date: new Date("2025-04-15"),
        summary:
          "ملخص للتقرير السنوي وأهم النقاط التي تمت مناقشتها خلال المؤتمر السنوي للعام 2025",
        imageUrl: "/uploads/article-1.jpg",
        content:
          "محتوى تفصيلي عن المؤتمر السنوي وأهم النقاط التي تمت مناقشتها. يشمل هذا التقرير تفاصيل عن المتحدثين الرئيسيين والموضوعات التي تمت تغطيتها والقرارات المهمة التي تم اتخاذها خلال المؤتمر.",
        author: "محمد عبدالله",
        readTime: "5 دقائق",
        isFeatured: true,
      },
      {
        title: "مقال عن التطورات الأخيرة",
        date: new Date("2025-04-10"),
        summary:
          "نظرة عامة على أحدث التطورات والتغييرات في المجال وتأثيرها على المستقبل",
        imageUrl: "/uploads/article-2.jpg",
        content:
          "تحليل شامل لأحدث التطورات والتغييرات في المجال. يتناول هذا المقال التوجهات الجديدة والتحديات المستقبلية والفرص المتاحة في ظل هذه التطورات المتسارعة.",
        author: "سارة أحمد",
        readTime: "4 دقائق",
        isFeatured: false,
      },
      {
        title: "دراسة تحليلية جديدة",
        date: new Date("2025-04-01"),
        summary:
          "نتائج الدراسة التحليلية الجديدة وتأثيرها على القطاع والتوصيات المقترحة",
        imageUrl: "/uploads/article-3.jpg",
        content:
          "عرض تفصيلي لنتائج الدراسة التحليلية الجديدة وتأثيرها على القطاع. تشمل هذه الدراسة بيانات إحصائية مهمة واستنتاجات رئيسية وتوصيات للتطوير المستقبلي.",
        author: "فاطمة محمود",
        readTime: "7 دقائق",
        isFeatured: true,
      },
    ]);

    // Create test events
    const events = await Event.insertMany([
      {
        title: "المؤتمر السنوي",
        date: new Date("2025-05-20"),
        location: "قاعة المؤتمرات الرئيسية",
        time: "10:00 صباحاً",
        description:
          "انضم إلينا في المؤتمر السنوي لمناقشة أهم المستجدات والتحديات في المجال والاستماع إلى خبراء متخصصين.",
        imageUrl: "/uploads/event-1.jpg",
        capacity: 30,
        registered: 23,
        isFeatured: true,
      },
      {
        title: "ورشة عمل تدريبية",
        date: new Date("2025-05-25"),
        location: "مركز التدريب",
        time: "9:00 صباحاً",
        description:
          "ورشة عمل تدريبية متخصصة لتطوير المهارات المهنية وتعزيز الكفاءات في مجالات متعددة.",
        imageUrl: "/uploads/event-2.jpg",
        capacity: 20,
        registered: 15,
        isFeatured: false,
      },
      {
        title: "لقاء مفتوح مع الخبراء",
        date: new Date("2025-06-05"),
        location: "القاعة الكبرى",
        time: "1:00 ظهراً",
        description:
          "فرصة للتواصل المباشر مع خبراء المجال وطرح الأسئلة والاستفادة من تجاربهم وخبراتهم.",
        imageUrl: "/uploads/event-3.jpg",
        capacity: 50,
        registered: 42,
        isFeatured: true,
      },
    ]);

    // Create test media
    const media = await Media.insertMany([
      {
        title: "صورة من الفعالية السابقة",
        description: "لقطات من الفعالية السابقة التي أقيمت في شهر مارس 2025",
        type: "image",
        url: "/uploads/media-1.jpg",
        thumbnail: null,
      },
      {
        title: "فيديو تعريفي",
        description: "فيديو يستعرض أهم أنشطة وإنجازات العام الماضي",
        type: "video",
        url: "/uploads/video-1.mp4",
        thumbnail: "/uploads/video-thumb-1.jpg",
      },
      {
        title: "معرض الصور",
        description: "صور مختارة من معرض الصور السنوي",
        type: "image",
        url: "/uploads/media-2.jpg",
        thumbnail: null,
      },
    ]);

    console.log("Test data seeded successfully");
    console.log(`Inserted ${articles.length} articles`);
    console.log(`Inserted ${events.length} events`);
    console.log(`Inserted ${media.length} media items`);
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    mongoose.disconnect();
  }
}

// Run the seed process
async function runSeed() {
  await clearData();
  await seedData();
}

runSeed();
