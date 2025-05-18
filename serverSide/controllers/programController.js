import Program from "../models/programModel.js";

// جلب البرامج حسب الفئة أو البحث
export const getPrograms = async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };

    const programs = await Program.find(query);
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// جلب جميع الفئات المتوفرة
export const getCategories = async (req, res) => {
  try {
    const categories = await Program.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
