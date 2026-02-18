const axios = require('axios');

module.exports = async (req, res) => {
    // إعدادات السماح لموقعك بالوصول
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "المرجو كتابة اسم الدواء" });
    }

    try {
        // الاتصال بموقع الوزارة مع رأس طلب (Headers) يحاكي المتصفح تماماً
        const response = await axios({
            method: 'get',
            url: `https://e-services.anam.ma/eServices/api/Medicament/GetMedicamentClause/${encodeURIComponent(name)}`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://e-services.anam.ma/eServices/Medicament',
                'Origin': 'https://e-services.anam.ma',
                'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,ar;q=0.6'
            },
            timeout: 15000 
        });
        
        // إرسال البيانات الناجحة
        res.status(200).json(response.data);
    } catch (error) {
        // في حالة الفشل، نحاول إرسال رسالة توضح السبب
        res.status(500).json({ 
            error: "فشل في جلب البيانات من المصدر",
            message: error.message 
        });
    }
};
