const crypto = require("crypto");
const Link = require("./models/links");

// Generate alphanumeric code (6-8 chars)
const generateCode = () => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = Math.floor(Math.random() * 3) + 6; // 6,7,8
    let code = "";
    const bytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
        code += charset[bytes[i] % charset.length];
    }
    return code;
};

// CREATE SHORT URL
// exports.createShortUrl = async (req, res) => {
//     try {
//         const { original_url, code } = req.body;
//         if (!original_url) {
//             return res.status(400).json({ message: "Original URL is required" });
//         }

//         let finalCode = code || generateCode();

//         const exists = await Link.findOne({ code: finalCode });
//         if (exists) {
//             return res.status(422).json({ message: "Code already exists" });
//         }

//         const newLink = await Link.create({
//             code: finalCode,
//             original_url
//         });

//         return res.status(201).json({
//             message: "Short URL created",
//             short_url: `${req.protocol}://${req.get("host")}/${finalCode}`,
//             data: newLink
//         });

//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// Create Short URL
exports.createShortUrl = async (req, res) => {
  try {
    const { original_url } = req.body;
    const code = Math.random().toString(36).substring(2, 8);

    const newLink = new Link({
      code,
      original_url,
      clicks: 0,
      created_at: new Date(),
      last_clicked: null
    });

    await newLink.save();
    res.status(201).json({ message: "Short URL created", data: newLink });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REDIRECT & COUNT
exports.redirectUrl = async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code });

        if (!link) {
            return res.status(404).json({ message: "Short link not found" });
        }

        link.clicks += 1;
        link.last_clicked = new Date();
        await link.save();

        return res.redirect(link.original_url);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET ALL LINKS
exports.getAllLinks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Link.countDocuments();
        const links = await Link.find()
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            data: links,
            pagination: {
                totalItems: total,
                currentPage: page,
                pageSize: limit,
                totalPages: Math.ceil(total / limit),
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET SINGLE
exports.getLinkById = async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code });
        if (!link) {
            return res.status(404).json({ message: "No Record Found" });
        }
        res.status(200).json({ data: link });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// DELETE
exports.deleteLink = async (req, res) => {
    try {
        const deleted = await Link.findOneAndDelete({ code: req.params.code });
        if (!deleted) {
            return res.status(404).json({ message: "Link Not Found" });
        }
        res.status(200).json({ message: "Link deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
