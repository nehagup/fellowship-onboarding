'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
// import Image from 'next/image';

const verifiedEmails = new Set([
  'pradhansatyajit182@gmail.com', 
  'amaanbhati49@gmail.com',
  'amaan.bhati@keploy.io',
  '22053848@kiit.ac.in', 
  '22052668@kiit.ac.in', 
  '22052668@kiit.ac.in', 
  'lohitkolluri@gmail.com', 
  'shahmeermondal1576@gmail.com', 
  'james.k.leung@stonybrook.edu', 
  '2206424@kiit.ac.in', 
  'amayd@iitbhilai.ac.in', 
  'pandeyansal77@gmail.com', 
  '2470251@kiit.ac.in', 
  '22052706@kiit.ac.in', 
  'kanishkjakhmola@gmail.com', 
  'aarab.nishchal@gmail.com', 
  'utsuronoyume@gmail.com', 
  'debeshacharya30@gmail.com', 
  'harshitbamotra.01@gmail.com', 
  'omaasinha.99@gmail.com', 
  'ayushman012@gmail.com', 
  '22052485@kiit.ac.in', 
  '2205333@kiit.ac.in', 
  'kotalpratik@gmail.com', 
  '2470390@kiit.ac.in', 
  'ansakanwal2145@gmail.com', 
  'Jared.werts@temple.edu', 
  'saivamshik11@gmail.com', 
  '22052724@kiit.ac.in', 
  'enesyilmaz5157@gmail.com', 
  'wittenpan@gmail.com', 
  'sarvanshmehta28@gmail.com', 
  '22054363@kiit.ac.in', 
  'divyanshurajput709@gmail.com', 
  'sahadribhattacharyya@gmail.com', 
  'siyonaj7@gmail.com', 
  'adityabakshi1011@gmail.com', 
  'utkarshshah000@gmail.com', 
  'harshkhaitan04@gmail.com', 
  '2470198@kiit.ac.in', 
  'mahi13singh2004@gmail.com', 
  'aryanv.india1@gmail.com', 
  'shweta8462603@gmail.com', 
  'dripclade@gmail.com', 
  '22051675@kiit.ac.in', 
  '22054202@kiit.ac.in', 
  'p2005p5499p@gmail.com', 
  'granthpai1503@gmail.com', 
  'richakumari.rk03@gmail.com', 
  '22052633@kiit.ac.in', 
  '22052250@kiit.ac.in', 
  '22051428@kiit.ac.in', 
  'supalvasani@gmail.com', 
  'chittej.vertika1008@gmail.com', 
  '22053930@kiit.ac.in', 
  '2205967@kiit.ac.in', 
  '22053930@kiit.ac.in', 
  'ashishhsharma19@gmail.com', 
  '2205712@kiit.ac.in', 
  'mdl.dhruba@gmail.com', 
  '22052865@kiit.ac.in', 
  '22052616@kiit.ac.in', 
  '2205130@kiit.ac.in', 
  'devlohani14251425@gmail.com', 
  '2470237@kit.ac.in', 
  'hrj2004117@gmail.com', 
  '2205598@kiit.ac.in', 
  'roykaushik354@gmail.com', 
  '22051160@kiit.ac.in', 
  'nikhilprince973@gmail.com', 
  'dp.dash12@gmail.com', 
  'ritesh.90503@gmail.com', 
  'omprernaroy@gmail.com', 
  '22052842@kiit.ac.in', 
  '2205951@kiit.ac.in', 
  '22051308@kiit.ac.in', 
  '2229035@Kiit.ac.in', 
  'dasayush483@gmail.com', 
  '22052854@kiit.ac.in', 
  'rudranil.das9900@gmail.com', 
  'tanmaykulkarni2112@gmail.com', 
  '2205840@kiit.ac.in', 
  'prakashaditya061@gmail.com', 
  'vineka2004@gmail.com', 
  'ananyaritu51@gmail.com', 
  'mohamedimthiyas62696@gmail.com', 
  'arpitarout132@gmail.com', 
  'samridhimishra1412@gmail.com', 
  '22052155@kiit.ac.in', 
  '2229154@kiit.ac.in', 
  '22052982@kiit.ac.in', 
  'vanshikasingh.2610.as@gmail.com', 
  'nikhilprince973@gmail.com', 
  'gunjanjaiswal2003@gmail.com', 
  'andrew@consarnproject.com', 
  'bakshiankit1005@gmail.com', 
  'mridulagarwal20082004@gmail.com', 
  'debarjunpal134@gmail.com', 
  '22051051@kiit.ac.in', 
  '22051081@kiit.ac.in', 
  'sameeramansoor03@gmail.com', 
  'roshan.kr.singh9857@gmail.com', 
  '2230120@kiit.ac.in', 
  '22051752@kiit.ac.in', 
  '22051797@gmail.com', 
  '22053227@kiit.ac.in', 
  '22053277@kiit.ac.in', 
  '22052093@kiit.ac.in', 
  '2205840@kiit.ac.in', 
  'ashishsingh009876@gmail.com', 
  'soumyodeep89s@gmail.com', 
  'shafaqueakhtar270@gmail.com', 
  'mauryapriyadarshi2004@gmail.com', 
  'lalatendurajguru.work@gmail.com', 
  'routsanket00@gmail.com', 
  '22053628@kiit.ac.in', 
  '22051178@kiit.ac.in', 
  'singhvishalk165@gmail.com', 
  '2205751@kiit.ac.in', 
  'rajpriyanshu1204@gmail.com', 
  '2230220@kiit.ac.in', 
  'vsonaljaiswal@gmail.com', 
  'kumar.ayushx24@gmail.com', 
  'adyashaanayakk@gmail.com', 
  '22052273@kiit.ac.in', 
  'kumarshashwat2004@gmail.com', 
  '22054339@kiit.ac.in', 
  '22051621@kiit.ac.in', 
  '22051027@kiit.ac.in', 
  '22052576@kiit.ac.in', 
  '22053615@kiit.ac.in', 
  '22051162@kiit.ac.in', 
  '22052387@kiit.ac.in', 
  'anushaamar1111@gmail.com', 
  'shecoder30@gmail.com', 
  '22052280@kiit.ac.in', 
  'aahwaantripathy@gmail.com', 
  'bhumika.c.prasanna@gmail.com', 
  '2206353@kiit.ac.in', 
  '2229069@kiit.ac.in', 
  'yashigarg016@gmail.com', 
  '22051172@kiit.ac.in', 
  'tonnitarafder2004@gmail.com', 
  'sumantripathi735@gmail.com', 
  'adityabahadur294@gmail.com', 
  'nageshkharat1910@gmail.com', 
  'anushaamar1111@gmail.com', 
  '2205846@kiit.ac.in', 
  'nandini.nd17@gmail.com', 
  'roykaushik354@gmail.com', 
  '22053398@kiit.ac.in', 
  '22051979@kiit.ac.in', 
  'shaswatjha12345@gmail.com', 
  'mratyunjaychouhan45@gmail.com', 
  'adityasr790@gmail.com', 
  '2204131@kiit.ac.in', 
  'ramankumar7c@gmail.com', 
  'swapsnil12@gmail.com', 
  'ritawang2301@gmail.com', 
  '2230239@kiit.ac.in', 
  'jeetsahoo2203@gmail.com', 
  '2230290@kiit.ac.in', 
  'pranjalbarnwaldev@gmail.com', 
  'deyt213@gmail.com', 
  '2205732@kiit.ac.in', 
  '22053295@kiit.ac.in', 
  '22051677@kiit.ac.in', 
  'riyamalh75@gmail.com', 
  'tpiyush2626@gmail.com', 
  '22051282@kiit.ac.in', 
  'souravadhikari2003@gmail.com', 
  'varun.mohanta323@gmail.com', 
  '22052779@kiit.ac.in', 
  'Ayushagrawal.5288@gmail.com', 
  'ghoshkaushiki2004@gmail.com', 
  '22053375@kiit.ac.in', 
  'akashadhya19@gmail.com', 
  'sneh2020pandey@gmail.com', 
  'jaishrees23102001@gmail.com', 
  '22051055@kiit.ac.in', 
  'kanimeena678@gmail.com', 
  'sounakdutta20@gmail.com', 
  'agrawalmohak988@gmail.com', 
  '2205697@kiit.ac.in', 
  'arpreet4114@gmail.com', 
  'devanshbajpai07@gmail.com', 
  '22053301@kiit.ac.in', 
  '22052300@kiit.ac.in', 
  'anshumaanrath310@gmail.com', 
  'swapnashree2020@gmail.com', 
  '22051328@kiit.ac.in', 
  '2204154@kiit.ac.in', 
  'shritisadhu@gmail.com', 
  'kishorshelke018@gmail.com', 
  '22052374@kiit.ac.in', 
  'amitanshupattnaik@gmail.com', 
  'emma91zhang@gmail.com', 
  '22051187@kiit.ac.in', 
  '2205624@kiit.ac.in', 
  '2205841@kiit.ac.in', 
  '22052471@kiit.ac.in', 
  'jiyajha2020@gmail.com', 
  '2206067@kiit.ac.in', 
  'harshit.kr.singh.work@gmail.com', 
  'rishikesh2747@gmail.com', 
  'hranjan3246@gmail.com', 
  '22053178@kiit.ac.in', 
  'fazalx12345@gmail.com', 
  '22051754@kiit.ac.in', 
  'anuragdgp@gmail.com', 
  'ayaanpattanayak54@gmail.com', 
  'maithilibprojects@gmail.com', 
  'rajshobhit48@gmail.com', 
  'sanjanabiswasiscute@gmail.com', 
  '22051875@kiit.ac.in', 
  '2230024@kiit.ac.in', 
  'amanraj1227@gmail.com', 
  'diptesh.bal@gmail.com', 
  'prityanshusingh2003@gmail.com', 
  'aditi22mehta22@gmail.com', 
  '22053501@kiit.ac.in', 
  'krishsenpai7@gmail.com', 
  'littleranit@gmail.com', 
  'mishrashardendu22@gmail.com', 
  'saha.saikat8142061825@gmail.com', 
  'lakshyadhingra26@gmail.com', 
  '22052935@kiit.ac.in', 
  '2205700@kiit.ac.in', 
  'manveer7saggu@gmail.com', 
  'bhagathemang360@gmail.com', 
  '22052388@kiit.ac.in', 
  '2228053@kiit.ac.in', 
  'souvik1252@gmail.com', 
  'harshxkumar7@gmail.com', 
  'harshxkumar7@gmail.com', 
  'che3zcake@gmail.com', 
  '22052244@kiit.ac.in', 
  '22053945@kiit.ac.in', 
  '22052983@kiit.ac.in', 
  'rluhar200@gmail.com', 
  'aayushjamaiyar.19@gmail.com', 
  '22053458@kiit.ac.in', 
  'avantikasharma405@gmail.com', 
  '22052983@kiit.ac.in', 
  '22052983@kiit.ac.in', 
  'prateekk.bharadwaj@gmail.com', 
  'uddipta278@gmail.com', 
  '22051875@kiit.ac.in', 
  'gurnoorsingh5294@gmail.com', 
  '100sumanghosh@gmail.com', 
  'sukarnbharadwaj2020@gmail.com', 
  '2229061@kiit.ac.in', 
  'shreyyprasad@gmail.com', 
  '22051532@kiit.ac.in', 
  '22052808@kiit.ac.in', 
  'xq1@williams.edu', 
  '22051289@kiit.ac.in', 
  'd.soumyadeepofficial@gmail.com', 
  '22051158@kiit.ac.in', 
  '22054321@kiit.ac.in', 
  'pankhigupta440@gmail.com', 
  'tanushreedutta298@gmail.com', 
  'singhaarka0@gmail.com', 
  'nikhildwivedi42794@gmail.com', 
  '22052626@kiit.ac.in', 
  'muhammedsabith221b@gmail.com', 
  'deepsikha1104@gmail.com', 
  'ybhatter@scu.edu', 
  '22053577@kiit.ac.in', 
  'anthonyrozario62@gmail.com', 
  '22051984@kiit.ac.in', 
  'anandabhinav293@gmail.com', 
  'bhamare.tn@gmail.com', 
  '2230274@kiit.ac.in', 
  '22053565@kiit.ac.in', 
  'sanand03072005@gmail.com', 
  'aks231273@gmail.com', 
  'eatulrajput@gmail.com', 
  'barmansagarika303@gmail.com', 
  'hemrajshelke087@gmail.com', 
  'jhashubham2076@gmail.com', 
  'adarshsikreewal1211@gmail.com', 
  '22052056@kiit.ac.in', 
  'adarshsikreewal1211@gmail.com', 
  'umrsjd123@gmail.com', 
  '22053297@kiit.ac.in', 
  '2205883@kiit.ac.in', 
  'srij35666@gmail.com', 
  'sasiyaelangovan@gmail.com', 
  'tnigam27@gmail.com', 
  'aks231273@gmail.com', 
  '33sorbojitmondal@gmail.com', 
  'deyricky36@gmail.com', 
  '22052787@kiit.ac.in', 
  'anuragofficial260@gmail.com', 
  'septdat@gmail.com', 
  'prasadyuvraj8805@gmail.com', 
  'singhaarka0@gmail.com', 
  '2470239@kiit.ac.in', 
  '22052732@kiit.ac.in', 
  'mohitmsq@gmail.com', 
  'sgc.burdwan@gmail.com', 
  '22053615@kiit.ac.in', 
  'anjupathak9810@gmail.com', 
  'anjupathak9810@gmail.com', 
  '22053140@kiit.ac.in', 
  '22051021@kiit.ac.in', 
  '22054184@kiit.ac.in', 
  'mmishrit0201@gmail.com', 
  '22054129@kiit.ac.in', 
  'daskaninika5@gmail.com', 
  '22053033@kiit.ac.in', 
  'pushkarjay.ajay1@gmail.com', 
  '22051040@kiit.ac.in', 
  '22051040@kiit.ac.in', 
  '22053977@kiit.ac.in', 
  'thiyathiya088@gmail.com', 
  'chaurasianikita984@gmail.com', 
  'krishnaalegend@gmail.com', 
  '22052424@kiit.ac.in', 
  'pahujanandini@gmail.com', 
  '1504aniket@gmail.com', 
  '22052172@kiit.ac.in', 
  'tanishgupta@umass.edu', 
  'tuanafk2006@gmail.com'
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
    link.download = 'keploy-opensource101-badge.png';
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
        Keploy - Open Source 101 Badge
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
                  ? 'Task 1 URL'
                  : field === 'task2'
                  ? 'Task 2 URL'
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
                <li>Ensure you submitted the assignment before the deadline, <strong>19th June 11AM</strong>.</li>
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
              <div className=" text-orange-400 text-sm">★</div>
              {/* Logo */}
              <img
                src="/assets/images/keploy-logo.png"
                alt="Keploy Logo"
                className="w-18 h-8 object-contain"
                crossOrigin="anonymous"
              />
              <p className="text-[16px] tracking-widest font-semibold text-gray-800 mt-0">API FELLOWSHIP</p>
              <h2 className="text-[24px] font-bold text-orange-600 my-1 mb-0">OPEN SOURCE 101</h2>
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