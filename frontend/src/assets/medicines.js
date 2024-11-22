import crocin_img from './crocin_img.png';
import dolo_img from './dolo_img.png';
import combiflam_img from './combiflam_img.png';
import ascoril_img from './ascoril_img.png';
import azithromycin_img from './azithromycin_img.png';
import allegra_img from './allegra_img.png';

export const assets = {
    crocin_img,
    dolo_img,
    combiflam_img,
    ascoril_img,
    azithromycin_img,
    allegra_img,
};

export const medicines = [

    {
        _id: 'med1',
        name: 'Crocin',
        image: crocin_img,
        category: 'Fever / Cold',
        description: 'Effective in reducing fever and providing relief from cold symptoms.',
        price: 25,
        manufacturer: 'GlaxoSmithKline Pharmaceuticals',
        dosage: '500 mg',
    },
    {
        _id: 'med2',
        name: 'Dolo 650',
        image: dolo_img,
        category: 'Pain Reliever / Fever Reducer',
        description: 'A widely used medicine for reducing fever and relieving body pain.',
        price: 30,
        manufacturer: 'Micro Labs Ltd.',
        dosage: '650 mg',
    },
    {
        _id: 'med3',
        name: 'Combiflam',
        image: combiflam_img,
        category: 'Pain Reliever',
        description: 'Combination of ibuprofen and paracetamol for pain relief.',
        price: 35,
        manufacturer: 'Sanofi India Limited',
        dosage: '400 mg + 325 mg',
    },
    {
        _id: 'med4',
        name: 'Ascoril',
        image: ascoril_img,
        category: 'Cough Syrup',
        description: 'A popular syrup for relieving cough and chest congestion.',
        price: 75,
        manufacturer: 'Glenmark Pharmaceuticals',
        dosage: '100 ml',
    },
    {
        _id: 'med5',
        name: 'Azithromycin',
        image: azithromycin_img,
        category: 'Antibiotic',
        description: 'Used to treat bacterial infections like respiratory and skin infections.',
        price: 80,
        manufacturer: 'Cipla',
        dosage: '500 mg',
    },
    {
        _id: 'med6',
        name: 'Allegra',
        image: allegra_img,
        category: 'Antihistamine',
        description: 'Relieves symptoms of allergies such as sneezing, runny nose, and itching.',
        price: 120,
        manufacturer: 'Sanofi India Limited',
        dosage: '120 mg',
    },
];
