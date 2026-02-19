export default async function handler(req, res) {
    // إعدادات الـ CORS للسماح لموقعك بالعمل
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { name } = req.query;
    if (!name) return res.status(400).json({ error: "المرجو كتابة اسم الدواء" });

    try {
        const url = `https://e-services.anam.ma/eServices/api/Medicament/GetMedicamentClause/${encodeURIComponent(name)}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://e-services.anam.ma/eServices/Medicament',
                'Origin': 'https://e-services.anam.ma',
                'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,ar;q=0.6',
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) throw new Error(`سيرفر الوزارة رد بـ: ${response.status}`);

        const data = await response.json();
        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ 
            error: "خطأ في جلب البيانات", 
            details: error.message 
        });
    }
}
