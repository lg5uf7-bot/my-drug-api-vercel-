const axios = require('axios');

module.exports = async (req, res) => {
    // إعدادات الوصول الشامل (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "الرجاء إدخال اسم الدواء" });
    }

    try {
        // تشفير الاسم ليدعم المسافات مثل (DOLIPRANE 500)
        const encodedName = encodeURIComponent(name);
        
        const response = await axios.get(`https://e-services.anam.ma/eServices/api/Medicament/GetMedicamentClause/${encodedName}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'ar,en-US;q=0.7,en;q=0.3',
                'Referer': 'https://e-services.anam.ma/eServices/Medicament',
                'Connection': 'keep-alive'
            },
            timeout: 12000 // رفع مهلة الانتظار لـ 12 ثانية
        });
        
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ 
            error: "فشل في جلب البيانات من المصدر الرسمي",
            details: error.message 
        });
    }
};
