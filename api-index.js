const axios = require('axios');

module.exports = async (req, res) => {
    // السماح بالوصول من أي مكان (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // الحصول على اسم الدواء من الرابط
    const { name } = req.query;

    try {
        const response = await axios.get(`https://e-services.anam.ma/eServices/api/Medicament/GetMedicamentClause/${name}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "خطأ في جلب البيانات" });
    }
};