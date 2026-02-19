const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { name } = req.query;
    if (!name) return res.status(400).json({ error: "المرجو كتابة اسم الدواء" });

    try {
        const response = await axios({
            method: 'get',
            url: `https://e-services.anam.ma/eServices/api/Medicament/GetMedicamentClause/${encodeURIComponent(name)}`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://e-services.anam.ma/eServices/Medicament',
                'Origin': 'https://e-services.anam.ma'
            },
            timeout: 15000 
        });
        
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "فشل الاتصال بالمصدر الرسمي، حاول مجدداً" });
    }
};
