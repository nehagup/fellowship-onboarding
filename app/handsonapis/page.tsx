'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
// import Image from 'next/image';

const verifiedEmails = new Set([
    'lohitkolluri@gmail.com',
    'amaanbhati49@gmail.com',
    'amaan.bhati@keploy.io',
    '22052633@kiit.ac.in',
    'swapsnil12@gmail.com',
    '22052865@kiit.ac.in',
    'mishrashardendu22@gmail.com',
    '33sorbojitmondal@gmail.com',
    'deyricky36@gmail.com',
    'tpiyush2626@gmail.com',
    '22053297@kiit.ac.in',
    'tnigam27@gmail.com',
    '22051869@kiit.ac.in',
    '22052551@kiit.ac.in',
    '22052724@kiit.ac.in',
    'soumyodeep89s@gmail.com',
    '2205697@kiit.ac.in',
    '22052668@kiit.ac.in',
    '22051160@kiit.ac.in',
    'debeshacharya30@gmail.com',
    'gkrcoder@gmail.com',
    'dasayush483@gmail.com',
    '22053945@kiit.ac.in',
    '2205700@kiit.ac.in',
    '22052376@kiit.ac.in',
    '22051675@kiit.ac.in',
    'uddipta278@gmail.com',
    '22053226@kiit.ac.in',
    'pandeyansal77@gmail.com',
    'mohamedimthiyas62696@gmail.com',
    '22053244@kiit.ac.in',
    'thiyathiya088@gmail.com',
    'pratyushprasoon138@gamail.com',
    'roykaushik354@gmail.com',
    'vanshikasingh.2610.as@gmail.com',
    'ybhatter@scu.edu',
    '2205951@kiit.ac.in',
    'kanishkjakhmola@gmail.com',
    '22051754@kiit.ac.in',
    '2470198@kiit.ac.in',
    'bhumika.c.prasanna@gmail.com',
    '22052787@kiit.ac.in',
    '22052101@kiit.ac.in',
    'srik2301@gmail.com',
    'rajpriyanshu1204@gmail.com',
    'shubham.hamirwasia03@gmail.com',
    '22052093@kiit.ac.in',
    'sahadribhattacharyya@gmail.com',
    '22051308@kiit.ac.in',
    'harshit.kr.singh.work@gmail.com',
    '22054406@kiit.ac.in',
    '2205846@kiit.ac.in',
    'vsonaljaiswal@gmail.com',
    'sukarnbharadwaj2020@gmail.com',
    'kumar.ayushx24@gmail.com',
    'divyanshurajput709@gmail.com',
    '22054339@kiit.ac.in',
    'shahmeermondal1576@gmail.com',
    'isha05vik@gmail.com',
    'singhvishalk165@gmail.com',
    'dripclade@gmail.com',
    'sanand03072005@gmail.com',
    '2205712@kiit.ac.in',
    '2205775@kiit.ac.in',
    '22051081@kiit.ac.in',
    '22051051@kiit.ac.in',
    '2470390@kiit.ac.in',
    'riyamalh75@gmail.com',
    'aarab.nishchal@gmail.com',
    'sambhav26k@gmail.com',
    '22052854@kiit.ac.in',
    'paitalsuryasnata@gmail.com',
    'diptesh.bal@gmail.com',
    'singhsahil812003@gmail.com',
    'rudranil.das9900@gmail.com',
    'shaswatjha12345@gmail.com',
    '2205840@kiit.ac.in',
    'granthpai1503@gmail.com',
    '22051848@kiit.ac.in',
    'omaasinha.99@gmail.com',
    'aryansaxenaalig@gmail.com',
    '22051814@kiit.ac.in',
    'rishikesh2747@gmail.com',
    'vikranthprathap@gmail.com',
    'hranjan3246@gmail.com',
    'kumarshashwat2004@gmail.com',
    'sarvanshmehta28@gmail.com',
    '2229154@kiit.ac.in',
    'shafaqueakhtar270@gmail.com',
    'krishnaalegend@gmail.com',
    'richakumari.rk03@gmail.com',
    'ananyaritu51@gmail.com',
    '2230024@kiit.ac.in',
    'mahi13singh2004@gmail.com',
    '22053615@kiit.ac.in',
    'jeetsahoo2203@gmail.com',
    '2230274@kiit.ac.in',
    '2204131@kiit.ac.in',
    '22052273@kiit.ac.in',
    '22051178@kiit.ac.in',
    'souravadhikari2003@gmail.com',
    '2470404@kiit.ac.in',
    'utkarshshah000@gmail.com',
    'devlohani14251425@gmail.com',
    'agrawalmohak988@gmail.com',
    'aayushjamaiyar.19@gmail.com',
    '22051782@kiit.ac.in',
    '22052983@kiit.ac.in',
    'ramankumar7c@gmail.com',
    '22051724@kiit.ac.in',
    'saivamshik11@gmail.com',
    'prakashaditya061@gmail.com',
    '22054363@kiit.ac.in',
    '2229035@kiit.ac.in',
    'harshitbamotra.01@gmail.com',
    'prasadyuvraj8805@gmail.com',
    '2206353@kiit.ac.in',
    'mratyunjaychouhan45@gmail.com',
    '22052485@kiit.ac.in',
    'nandini.nd17@gmail.com',
    'emma91zhang@gmail.com',
    '22052706@kiit.ac.in',
    '22051187@kiit.ac.in',
    'yashigarg016@gmail.com',
    '22051621@kiit.ac.in',
    'utsuronoyume@gmail.com',
    '22051172@kiit.ac.in',
    '22051027@kiit.ac.in',
    'devanshbajpai07@gmail.com',
    '2230239@kiit.ac.in',
    'sraj80525@gmail.com',
    '22051677@kiit.ac.in',
    'aahwaantripathy@gmail.com',
    '22053194@kiit.ac.in',
    'p2005p5499p@gmail.com',
    '22051055@kiit.ac.in',
    'adityasr790@gmail.com',
    'ashishsingh009876@gmail.com',
    '22051289@kiit.ac.in',
    'akashadhya19@gmail.com',
    '22051979@kiit.ac.in',
    'saha.saikat8142061825@gmail.com',
    '2205751@kiit.ac.in',
    'amitanshupattnaik@gmail.com',
    '2230290@kiit.ac.in',
    'anshumaanrath310@gmail.com',
    '22052576@kiit.ac.in',
    '2230220@kiit.ac.in',
    'abhayrathore036@gmail.com',
    'swapnashree2020@gmail.com',
    'tanmaykulkarni2112@gmail.com',
    'tonnitarafder2004@gmail.com',
    '2205624@kiit.ac.in',
    '22053977@kiit.ac.in',
    '22052808@kiit.ac.in',
    '22053227@kiit.ac.in',
    '100sumanghosh@gmail.com',
    'amanraj1227@gmail.com',
    'dev.kunaldarekar99@gmail.com',
    'mridulagarwal20082004@gmail.com',
    '22052388@kiit.ac.in',
    'prityanshusingh2003@gmail.com',
    '2205292@kiit.ac.in',
    '22051875@kiit.ac.in',
    'singhaarka0@gmail.com',
    '22052779@kiit.ac.in',
    'krishsenpai7@gmail.com',
    '22053301@kiit.ac.in',
    'pranavmetil@gmail.com',
    'lakshyadhingra26@gmail.com',
    '22051752@kiit.ac.in',
    '22051428@kiit.ac.in',
    'kanimeena678@gmail.com',
    '2470478@kiit.ac.in',
    'aryanv.india1@gmail.com',
    '22051282@kiit.ac.in',
    'hrittickramspi40@gmail.com',
    '22052155@kiit.ac.in',
    '22051328@kiit.ac.in',
    '22053501@kiit.ac.in',
    'ayushmans012@gmail.com',
    'ayaanpattanayak54@gmail.com',
    '2470232@kiit.ac.in',
    'deepsikha1104@gmail.com',
    '22051021@kiit.ac.in',
    'Roshan.kr.singh9857@gmail.com',
    'manveer7saggu@gmail.com',
    'adarshsikreewal1211@gmail.com',
    '22052842@kiit.ac.in',
    '22053178@kiit.ac.in',
    'sounakdutta20@gmail.com',
    'debarjunpal134@gmail.com',
    '2470251@kiit.ac.in',
    '22052616@kiit.ac.in',
    'fazalx12345@gmail.com',
    '22052471@kiit.ac.in',
    '2230147@kiit.ac.in',
    'aditi22mehta22@gmail.com',
    'mauryapriyadarshi2004@gmail.com',
    'pranjalbarnwaldev@gmail.com',
    '22052935@kiit.ac.in',
    'maithilibprojects@gmail.com',
    '22052172@kiit.ac.in',
    'siyonaj7@gmail.com',
    'ayushmanayp@gmail.com',
    'sanjanabiswasiscute@gmail.com',
    '22052939@kiit.ac.in',
    '2205130@kiit.ac.in',
    '2206205@kiit.ac.in',
    'yashsinhays20@gmail.com',
    'andrew@consarnproject.com',
    'wittenpan@gmail.com',
    '2228053@kiit.ac.in',
    'littleranit@gmai.com',
    'mdl.dhruba@gmal.com',
    '22052732@kiit.ac.in',
    'bhamare.tn@gmail.com',
    '22051158@gmail.com',
    '2230121@kiit.ac.in',
    'james.k.leung@stonybrook.edu',
    '22052244@kiit.ac.in',
    'aks231273@gmail.com',
    'anuragdgp@gmail.com',
    '22052626@kiit.ac.in',
    '22054321@kiit.ac.in',
    'nikhildwivedi42794@gmail.com',
    '2230120@kiit.ac.in',
    'goel.tarushi@gmail.com',
    'nehabommireddy@gmail.com',
    'kotalpratik@gmail.com',
    'arpreet4114@gmail.com',
    'gurnoorsingh5294@gmail.com',
    'hemrajshelke087@gmail.com',
    'shritisadhu@gmail.com',
    'vivekganeshs12@gmail.com',
    'adityabahadur294@gmail.com',
    '22053458@kiit.ac.in',
    'ghoshkaushiki2004@gmail.com',
    'bakshiankit1005@gmail.com',
    'ritesh.90503@gmail.com',
    'varun.mohanta323@gmail.com',
    '22052982@kiit.ac.in',
    'eatulrajput@gmail.com',
    'www.ashikasingh04968@gmil.com',
    'nikhilprince973@gmail.com',
    'vineka2004@gmail.com',
    'rluhar200@gmail.com',
    'sumantripathi735@gmail.com',
    '2205841@kiit.ac.in',
    '22053295@kiit.ac.in',
    'arpanofficial321@gmail.com',
    '22052374@kiit.ac.in',
    'souvik1252@gmail.com',
    'anthonyrozario62@gmail.com',
    '22052998@kiit.ac.in',
    'srij35666@gmail.com',
    'mmishrit0201@gmail.com',
    '2205967@kiit.ac.in',
    'muhammedsabith221b@gmail.com',
    'anuragofficial260@gmail.com',
    '2229061@kiit.ac.in',
    'kishorshelke018@gmail.com',
    '22053375@kiit.ac.in',
    'd.soumyadeepofficial@gmail.com',
    'barmansagarika303@gmail.com',
    '22051040@kiit.ac.in',
    'septdat@gmail.com',
    'debalina.maity04138@gmail.com',
    '22053398@kiit.ac.in',
    'anushaamar1111@gmail.com',
    'tanushreedutta298@gmail.com',
    'chittej.vertika1008@gmail.com',
    'jared.werts@temple.edu',
    '2205883@kiit.ac.in',
    '2206424@kiit.ac.in',
    'sgc.burdwan@gmail.com',
    '22053277@kiit.ac.in',
    'vipulsingh.1404@gmail.com',
    '2205732@kiit.ac.in',
    'pankhigupta440@gmail.com',
    'shubhamsahoo401@gmail.com',
    'xq1@williams.edu',
    '22054129@kiit.ac.in',
    '22051911@kiit.ac.in',
    '22054202@kiit.ac.in',
    'sumitsaha.ps@gmail.com',
    '22053140@kiit.ac.in',
    'adyashaanayakk@gmail.com',
    'tuanafk2006@gmail.com',
    '2229069@kiit.ac.in',
    'vibhavyash30@gmail.com',
    '2470224@kiit.ac.in',
    'supalvasani@gmail.com',
  ]);
  


const generateBadgeId = () => `BADGE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

export default function BadgeGenerator() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', github: '', email: '', task1: '', task2: '' });
  const [badgeGenerated, setBadgeGenerated] = useState<boolean | null>(null);
  const [badgeId, setBadgeId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    const { name, github, email, task1, task2 } = formData;

    if (!name || !github || !email || !task1 || !task2) {
      alert('Please fill all fields.');
      return;
    }

    if (!verifiedEmails.has(email.trim().toLowerCase())) {
      setBadgeGenerated(false);
      return;
    }

    setBadgeId(generateBadgeId());
    setBadgeGenerated(true);
  };

  const handleDownload = async () => {
    if (!badgeRef.current) return;

    const canvas = await html2canvas(badgeRef.current, { scale: 3 });
    const link = document.createElement('a');
    link.download = 'keploy-handsonapis-badge.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen relative py-10 px-4">
      {/* Background image visible only when badge not generated */}
      {!badgeGenerated && (
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('https://res.cloudinary.com/dqwbkjfuh/image/upload/v1750324750/orange-painting_edknnl.jpg')] bg-cover bg-center" />
        </div>
      )}

      <h1 className="relative z-10 text-4xl font-bold text-center text-white-100 mb-6">
        Keploy - Hands on APIs Badge
      </h1>

      {/* Glassmorphic Form */}
      {!badgeGenerated && (
        <div className="relative z-10 max-w-md mx-auto backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl shadow-2xl p-6 space-y-4 text-white">
          {['name', 'github', 'email', 'task1', 'task2'].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={
                field === 'task1'
                  ? 'Project Repo UrL'
                  : field === 'task2'
                  ? 'Live Preview URL (if availaible)'
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-white/80 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          ))}

          <button
            onClick={handleGenerate}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md"
          >
            Generate Badge
          </button>

          {badgeGenerated === false && (
            <div className="mt-6 p-4 rounded-lg border border-red-400 bg-red-100/40 backdrop-blur-md text-sm text-red-900">
              <strong className="block font-semibold mb-1">Badge generation unsuccessful:</strong>
              <ul className="list-disc list-inside">
                <li>Ensure you submitted the assignment before the deadline, <strong>21st June 11AM</strong>.</li>
                <li>Use the <strong>same email ID</strong> you submitted in the form.</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Badge Preview */}
      {badgeGenerated && (
        <div className="flex flex-col items-center ">
          <div
            ref={badgeRef}
            className="w-[350px] h-[350px] bg-white shadow-xl rounded-2xl flex items-center justify-center relative mt-20"
          >
            <div className="w-[300px] h-[300px] mt-2 bg-gradient-to-br from-orange-100 to-white rounded-full flex flex-col items-center justify-center text-center p-6 relative border-[6px] border-orange-200">
              {/* Ribbon */}
              <div className="absolute top-0 w-10 h-4 bg-orange-500 rounded-b-xl" />
              {/* Stars */}
              <div className=" text-orange-400 text-sm">★★</div>
              {/* Logo */}
              <img
                src="/assets/images/keploy-logo.png"
                alt="Keploy Logo"
                className="w-18 h-8 object-contain"
                crossOrigin="anonymous"
              />
              <p className="text-[16px] tracking-widest font-semibold text-gray-800 mt-0">API FELLOWSHIP</p>
              <h2 className="text-[24px] font-bold text-orange-600 my-1 mb-0">Master Of APIs</h2>
              <h3 className=" font-bold text-gray-800 text-[20px] mb-0">{formData.name}</h3>
              <p className="text-[11px] text-gray-600 -mt-1">HANDS-ON LEARNING</p>
              <p className="text-[10px] text-gray-500">{new Date().toLocaleDateString()}</p>
              {/* <p className="text-[13px] mt-2 text-gray-400 italic">{badgeId}</p> */}
              <div className="absolute bottom-2 -mt-[20px] w-12 h-1 bg-orange-400 rounded-full" />
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
}