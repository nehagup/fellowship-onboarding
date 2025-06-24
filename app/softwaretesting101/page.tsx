'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const verifiedEmails = new Set([
  '22051869@kiit.ac.in',
  'kanishkjakhmola@gmail.com',
  'kumar.ayushx24@gmail.com',
  'roykaushik354@gmail.com',
  '22052551@kiit.ac.in',
  '22054339@kiit.ac.in',
  '22052668@kiit.ac.in',
  '22053945@kiit.ac.in',
  'dripclade@gmail.com',
  'soumyodeep89s@gmail.com',
  '2205700@kiit.ac.in',
  '22052633@kiit.ac.in',
  '22051675@kiit.ac.in',
  'thiyathiya088@gmail.com',
  'isha05vik@gmail.com',
  '22051162@kiit.ac.in',
  'nikhildwivedi42794@gmail.com',
  '2205712@kiit.ac.in',
  '2205951@kiit.ac.in',
  'prakashaditya061@gmail.com',
  'srik2301@gmail.com',
  'rajpriyanshu1204@gmail.com',
  'debeshacharya30@gmail.com',
  '22051081@kiit.ac.in',
  '2205718@kiit.ac.in',
  'arinkishore7@gmail.com',
  '22052865@kiit.ac.in',
  'harshpdsingh@gmail.com',
  'paitalsuryasnata@gmail.com',
  '2470251@kiit.ac.in',
  '22051328@kiit.ac.in',
  'swapnashree2020@gmail.com',
  '2205598@kiit.ac.in',
  '22053226@kiit.ac.in',
  'shweta8462603@gmail.com',
  'yashigarg016@gmail.com',
  'chaitanyarai19@gmail.com',
  '22052616@kiit.ac.in',
  'sanand03072005@gmail.com',
  '22051051@kiit.ac.in',
  'sahadribhattacharyya@gmail.com',
  'vibhavyash30@gmail.com',
  '22053227@kiit.ac.in',
  'shaswatjha12345@gmail.com',
  'anandabhinav293@gmail.com',
  'tpiyush2626@gmail.com',
  'arpreet4114@gmail.com',
  'dev.kunaldarekar99@gmail.com',
  '22051754@kiit.ac.in',
  '22051532@kiit.ac.in',
  '2229154@kiit.ac.in',
  'yashsinhays20@gmail.com',
  'jeetsahoo2203@gmail.com',
  'tanmaykulkarni2112@gmail.com',
  'mratyunjaychouhan45@gmail.com',
  'utsuronoyume@gmail.com',
  'jaishrees23102001@gmail.com',
  'diptesh.bal@gmail.com',
  '2206353@kiit.ac.in',
  'harshit.kr.singh.work@gmail.com',
  '22051172@kiit.ac.in',
  'vsonaljaiswal@gmail.com',
  '22051282@kiit.ac.in',
  'aditi22mehta22@gmail.com',
  '22052485@kiit.ac.in',
  '22052140@kiit.ac.in',
  'saivamshik11@gmail.com',
  '22052172@kiit.ac.in',
  'pranjalbarnwaldev@gmail.com',
  'sanjanabiswas557@gmail.com',
  '22052842@kiit.ac.in',
  '22053615@kiit.ac.in',
  '22052093@kiit.ac.in',
  'ananyaritu51@gmail.com',
  'nandini.nd17@gmail.com',
  'kishorshelke018@gmail.com',
  '33sorbojitmondal@gmail.com',
  'omaasinha.99@gmail.com',
  'hemrajshelke087@gmail.com',
  'souravadhikari2003@gmail.com',
  'sumantripathi735@gmail.com',
  '2206424@kiit.ac.in',
  'bakshivaishvik@gmail.com',
  'aahwaantripathy@gmail.com',
  'supalvasani@gmail.com',
  'rudranil.das9900@gmail.com',
  '2205846@kiit.ac.in',
  '22053295@kiit.ac.in',
  'shubhamsahoo401@gmail.com',
  '2205840@kiit.ac.in',
  'tonnitarafder2004@gmail.com',
  'ybhatter@scu.edu',
  'debalina.maity04138@gmail.com',
  '22052101@kiit.ac.in',
  'debasishbisoi524@gmail.com',
  'richakumari.rk03@gmail.com',
  '2229069@kiit.ac.in',
  '22052983@kiit.ac.in',
  '22051782@kiit.ac.in',
  'Vikranthprathap@gmail.com',
  '2205130@kiit.ac.in',
  '2230290@kiit.ac.in',
  '2205732@kiit.ac.in',
  'rishikesh2747@gmail.com',
  'hranjan3246@gmail.com',
  'adyashaanayakk@gmail.com',
  '22054184@kiit.ac.in',
  'mishrashardendu22@gmail.com',
  '2206115@kiit.ac.in',
  '2230024@kiit.ac.in',
  'singhaarka0@gmail.com',
  '22052155@kiit.ac.in',
  'saha.saikat8142061825@gmail.com',
  'kumarshashwat2004@gmail.com',
  '2229035@kiit.ac',
  'tulsyanaditya03@gmail.com',
  'riyamalh75@gmail.com',
  'varun.mohanta323@gmail.com',
  '22054202@kiit.ac.in',
  '2470390@kiit.ac.in',
  'monasrimohandoss@gmail.com',
  '2204154@kiit.ac.in',
  'sarvanshmehta28@gmail.com',
  '22051178@kiit.ac.in',
  'vipulsingh.1404@gmail.com',
  'aarab.nishchal@gmail.com',
  'avantikasharma405@gmail.com',
  'vanshikasingh.2610.as@gmail.com',
  'shahmeermondal1576@gmail.com',
  '2204131@kiit.ac.in',
  'singhvishalk165@gmail.com',
  'vivekganeshs12@gmail.com',
  'hansikachaudhary20@gmail.com',
  '2470478@kiit.ac.in',
  'agrawalmohak988@gmail.com',
  '2230274@kiit.ac.in',
  'mohamedimthiyas62696@gmail.com',
  '22053977@kiit.ac.in',
  'ramankumar7c@gmail.com',
  'muhammedsabith221b@gmail.com',
  '22051428@kiit.ac.in',
  'sounakdutta20@gmail.com',
  'anshumaanrath310@gmail.com',
  '22051027@kiit.ac.in',
  'adityabahadur294@gmail.com',
  'ashishsingh009876@gmail.com',
  '2229061@kiit.ac.in',
  'uddipta278@gmail.com',
  'kanimeena678@gmail.com',
  'deyricky36@gmail.com',
  'prityanshusingh2003@gmail.com',
  'hrittickramspi40@gmail.com',
  'aayushjamaiyar.19@gmail.com',
  '22051621@kiit.ac.in',
  '2205697@kiit.ac.in',
  '22053194@kiit.ac.in',
  'dasayush483@gmail.com',
  'sumitsaha.ps@gmail.com',
  'utkarshshah000@gmail.com',
  '22052732@kiit.ac.in',
  'ayushmans012@gmail.com',
  '22052706@kiit.ac.in',
  'harshitbamotra.01@gmail.com',
  'devanshbajpai07@gmail.com',
  '22052576@kiit.ac.in',
  '22053260@kiit.ac.in',
  '2205624@kiit.ac.in',
  '22051055@kiit.ac.in',
  '2206067@kiit.ac.in',
  '22051752@kiit.ac.in',
  'krishnaalegend@gmail.com',
  '2470404@kiit.ac.in',
  '22052724@kiit.ac.in',
  'sanskar0627@gmail.com',
  'amanraj1227@gmail.com',
  '22052388@kiit.ac.in',
  '22053297@kiit.ac.in',
  '22052273@kiit.ac.in',
  'gkrcoder@gmail.com',
  'pranavmetil@gmail.com',
  '22051875@kiit.ac.in',
  'krishsenpai7@gmail.com',
  'lakshyadhingra26@gmail.com',
  'devlohani14251425@gmail.com',
  'deepsikha1104@gmail.com',
  'mahi13singh2004@gmail.com',
  'mauryapriyadarshi2004@gmail.com',
  '22053301@kiit.ac.in',
  'adarshsikreewal1211@gmail.com',
  'mridulagarwal20082004@gmail.com',
  'nigamtumul99@gmail.com',
  'ayaanpattanayak54@gmail.com',
  '22051187@kiit.ac.in',
  '22054129@kiit.ac.in',
  '22051677@kiit.ac.in',
  '22053178@kiit.ac.in',
  '22052471@kiit.ac.in',
  '22052854@kiit.ac.in',
  'samriddhi.singh1222@gmail.com',
  '22052808@kiit.ac.in',
  '2230147@kiit.ac.in',
  'abhibratchandabunty@gmail.com',
  'fazalx12345@gmail.com',
  'manveer7saggu@gmail.com',
  '22054295@kiit.ac.in',
  'emma91zhang@gmail.com',
  'mdl.dhruba@gmail.com',
  'anjupathak9810@gmail.com',
  'james.k.leung@stonybrook.edu',
  'siyonaj7@gmail.com',
  'maithilibprojects@gmail.com',
  '2230220@kiit.ac.in',
  'jared.werts@temple.edu',
  'Roshan.kr.singh9857@gmail.com',
  'andrew@consarnproject.com',
  '22054321@kiit.ac.in',
  'bakshiankit1005@gmail.com',
  'wittenpan@gmail.com',
  '2205751@kiit.ac.in',
  'eatulrajput@gmail.com',
  'nehabommireddy@gmail.com',
  '2228053@kiit.ac.in',
  'xq1@williams.edu',
  '22053458@kiit.ac.in',
  '22051979@kiit.ac.in',
  'septdat@gmail.com',
  'tanushreedutta298@gmail.com',
  'bhagathemang360@gmail.com',
  '2205292@kiit.ac.in',
  '22053244@kiit.ac.in',
  'ghoshkaushiki2004@gmail.com',
  '2205967@kiit.ac.in',
  'sukarnbharadwaj2020@gmail.com',
  '22052626@kiit.ac.in',
  'p2005p5499p@gmail.com',
  'd.soumyadeepofficial@gmail.com',
  '22054363@kiit.ac.in',
  '22052982@kiit.ac.in',
  'aryanv.india1@gmail.com',
  '2230120@kiit.ac.in',
  'anthonyrozario62@gmail.com',
  '22053398@kiit.ac.in',
  'debarjunpal134@gmail.com',
  'nikhilprince973@gmail.com',
  '22053140@kiit.ac.in',
  '22051795@kiit.ac.in',
  'bhamare.tn@gmail.com',
  'souvik1252@gmail.com',
  '100sumanghosh@gmail.com',
  'aks231273@gmail.com',
  'nhuha919@gmail.com',
  'www.ashikasingh04968@gmil.com',
  '2205841@kiit.ac.in',
  'che3zcake@gmail.com',
  'prithad974@gmail.com',
  'hrj2004117@gmail.com',
  '22053501@kiit.ac.in',
  'shritisadhu@gmail.com',
  '22052374@kiit.ac.in',
  'vineka2004@gmail.com',
  '22052935@kiit.ac.in',
  'devabdulx@gmail.com',
  '22054406@kiit.ac.in',
  'swapsnil12@gmail.com',
  '22051308@kiit.ac.in',
  'aryansaxenaalig@gmail.com',
  'tuanafk2006@gmail.com',
  'sasiyaelangovan@gmail.com',
  'amaanbhati49@gmail.com',
  'amaan.bhati@keploy.io'
]);


const generateBadgeId = () =>
  `BADGE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

export default function BadgeGenerator() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    github: '',
    email: '',
    task1: '',
  });
  const [badgeGenerated, setBadgeGenerated] = useState<boolean | null>(null);
  const [badgeId, setBadgeId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    const { name, github, email, task1 } = formData;

    if (!name || !github || !email || !task1) {
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
    link.download = 'keploy-opensource101-badge.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen relative py-10 px-4">
      {!badgeGenerated && (
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('https://res.cloudinary.com/dqwbkjfuh/image/upload/v1750324750/orange-painting_edknnl.jpg')] bg-cover bg-center" />
        </div>
      )}

      <h1 className="relative z-10 text-4xl font-bold text-center text-white-100 mb-6">
        Keploy - Software Testing 101 Badge
      </h1>

      {!badgeGenerated && (
        <div className="relative z-10 max-w-md mx-auto backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl shadow-2xl p-6 space-y-4 text-white">
          {['name', 'github', 'email', 'task1'].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={
                field === 'task1'
                  ? 'Task/Repo URL'
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
              <strong className="block font-semibold mb-1">
                Badge generation unsuccessful:
              </strong>
              <ul className="list-disc list-inside">
                <li>
                  Ensure you submitted the assignment before the deadline,{' '}
                  <strong>24th June 11AM</strong>.
                </li>
                <li>
                  Use the <strong>same email ID</strong> you submitted in the
                  form.
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {badgeGenerated && (
        <div className="flex flex-col items-center ">
          <div
            ref={badgeRef}
            className="w-[350px] h-[350px] bg-white shadow-xl rounded-2xl flex items-center justify-center relative mt-20"
          >
            <div className="w-[300px] h-[300px] mt-2 bg-gradient-to-br from-orange-100 to-white rounded-full flex flex-col items-center justify-center text-center p-6 relative border-[6px] border-orange-200">
              <div className="absolute top-0 w-10 h-4 bg-orange-500 rounded-b-xl" />
              <div className=" text-orange-400 text-sm">★★★</div>
              <img
                src="/assets/images/keploy-logo.png"
                alt="Keploy Logo"
                className="w-18 h-8 object-contain"
                crossOrigin="anonymous"
              />
              <p className="text-[16px] tracking-widest font-semibold text-gray-800 mt-0">
                API FELLOWSHIP
              </p>
              <h2 className="text-[23px] font-bold text-orange-600 my-1 mb-0">
                Software Testing 101
              </h2>
              <h3 className=" font-bold text-gray-800 text-[20px] mb-0">
                {formData.name}
              </h3>
              <p className="text-[11px] text-gray-600 -mt-1">
                HANDS-ON LEARNING
              </p>
              <p className="text-[10px] text-gray-500">
                {new Date().toLocaleDateString()}
              </p>
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
