const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "المرجو كتابة اسم الدواء" });
    }

    try {
        // إضافة Headers لتقليد المتصفح وتجنب الحظر
        const response = await axios.get(`https://e-services.anam.ma/eServices/api/Medicament/GetMedicamentClause/${encodeURIComponent(name)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://e-services.anam.ma/',
                'Origin': 'https://e-services.anam.ma'
            },
            timeout: 10000 // زيادة وقت الانتظار لـ 10 ثوانٍ
        });
        
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error details:", error.message);
        res.status(500).json({ 
            error: "فشل الاتصال بموقع الوزارة. تأكد من الاسم أو حاول لاحقاً.",
            details: error.message 
        });
    }
};
