const db = require("../config/db");   // your MySQL connection
const crypto = require("crypto");

const error422 = (message, res) => {
    return res.status(422).json({
        status: 422,
        message: message
    })
}
const error500 = (error, res )=>{
    console.log(error);
    
    return res.status(500).json({
        status:500,
        message:"Internal Server Error",
        error:error
    })
}

// Generate short code
const generateCode = (length = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let result = '';
    const randomBytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
        result += characters[randomBytes[i] % charactersLength];
    }

    return result;
};

const generateCodeWithLength = () => {
    const length = Math.floor(Math.random() * 3) + 6; // generates 6,7,8
    return generateCode(length);
};


// ===============================
// CREATE Short URL
// ===============================
exports.createShortUrl = async (req, res) => {
    const { original_url, code } = req.body;

    if (!original_url) {
        return res.status(400).json({ message: "Original URL is required" });
    }

    // If user provided a custom code use it, else generate one
    let usercode = code || generateCodeWithLength();

    try {
        // Ensure code is unique
        const checkQuery = "SELECT id FROM links WHERE code = ?";
        const [rows] = await db.query(checkQuery, [usercode]);

        if (rows.length > 0) {
            // Code exists → generate new one
            // usercode = generateCode();

            return error422("Code is already exist",res);
        }

        const query1 = `
            INSERT INTO links (code, original_url)
            VALUES (?, ?)
        `;

        await db.query(query1, [usercode, original_url]);

        return res.status(201).json({
            message: "Short URL created",
            short_url: `${req.protocol}://${req.get("host")}/${usercode}`, // corrected URL
            usercode,
            original_url,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something went wrong",
        });
    }
};



// ===============================
// REDIRECT + COUNT CLICK
// ===============================
exports.redirectUrl = async (req, res) => {
    const { code } = req.params;
    try {
        const query = `SELECT * FROM links WHERE code = ?`;
        const results = await db.query(query, [code])
        //   
        const urlData = results[0];
        if (urlData.length === 0) {
            return res.status(404).json({ message: "Short link not found" });
        }


        // update click count + last clicked time
        const updateQuery = `
        UPDATE links
        SET clicks = clicks + 1, last_clicked = NOW()
        WHERE code = ?
      `;

        db.query(updateQuery, [code]);
        // return res.status(200).json(urlData);
        return res.redirect(urlData[0].original_url);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllLinks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const countQuery = `SELECT COUNT(*) AS total FROM links`;
        const [countResult] = await db.query(countQuery);
        const total = countResult[0].total;

        const query = `SELECT * FROM links ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        const results = await db.query(query, [limit, offset]);

        const urlData = results[0];

        if (urlData.length === 0) {
            return res.status(404).json({ message: "link not found" });
        }

        return res.status(200).json({
            data: urlData,
            pagination: {
                totalItems: total,
                currentPage: page,
                pageSize: limit,
                totalPages: Math.ceil(total / limit),
            }
        });

    } catch (error) {
        return res.status(500).json(error);
    }
};

// ===============================
// GET SINGLE URL BY ID
// ===============================
exports.getLinkById = async (req, res) => {
    const Linkcode = parseInt(req.params.code)
    try {
        let getLinkQuery = "SELECT * FROM links WHERE code=?"
       
        const getLinkResult = await db.query(getLinkQuery, [Linkcode])
        if (!getLinkResult[0][0]) {
            return res.status(404).json({
                status: 404,
                message: 'No Record found'

            })
        }
        let data = getLinkResult[0][0]
        return res.status(200).json({
            status: 200,
            message: "Category retrived successfully",
            data:data
        })
    } catch (error) {
        return error500(error, res)
    }
};

exports.deleteLink = async (req, res)=>{
    const Link_code = parseInt(req.params.code);
    //is category exist
    let isLinkExistQuery = "SELECT * FROM  links WHERE  code = ?";
    let isLinkExistResult = await db.query(isLinkExistQuery,[Link_code]);
    if (isLinkExistResult[0]==0) {
        return error422("Link Not Found", res);  
    }
    try {
        //delete category
        let deleteListQuery = "DELETE FROM links WHERE code = ?"
        await db.query(deleteListQuery,[Link_code])
        return res.status(200).json({
            status:200,
            message:"links deleted successfully"
        })
        
    } catch (error) {
       return error500(error, res); 
    }
}