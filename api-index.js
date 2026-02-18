const axios = require('axios');

module.exports = async (req, res) => {
    // إعدادات السماح لموقعك بالوصول (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "المرجو كتابة اسم الدواء" });
    }

    try {
        // الاتصال بموقع الوزارة مع "تقمص" شخصية متصفح حقيقي
        const response = await axios.get(`https://e-services.anam.ma/eServices/api/Medicament/GetMedicamentClause/${encodeURIComponent(name)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'ar,en-US;q=0.7,en;q=0.3',
                'Referer': 'https://e-services.anam.ma/',
                'Origin': 'https://e-services.anam.ma'
            },
            timeout: 15000 // رفع وقت الانتظار لـ 15 ثانية لأن سيرفر الوزارة بطيء
        });
        
        // إرسال البيانات الناجحة
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Detailed Error:", error.message);
        res.status(500).json({ 
            error: "فشل الاتصال بموقع الوزارة. حاول مجدداً بعد ثوانٍ.",
            message: error.message 
        });
    }
};
