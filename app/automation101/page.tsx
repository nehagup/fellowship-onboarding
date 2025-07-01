'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const verifiedEmails = new Set([
    'amaanbhati49@gmail.com',
    'amaan.bhati@keploy.io',
    '22054339@kiit.ac.in',
    '2206115@kiit.ac.in',
    'debeshacharya30@gmail.com',
    '2229069@kiit.ac.in',
    'utsuronoyume@gmail.com',
    '22052668@kiit.ac.in',
    'p2005p5499p@gmail.com',
    '2230239@kiit.ac.in',
    '2204154@kiit.ac.in',
    'mishrashardendu22@gmail.com',
    '22051675@kiit.ac.in',
    'kotalpratik@gmail.com',
    '2230220@kiit.ac.in',
    'ragesh28@gmail.com',
    '2230121@kiit.ac.in',
    '2205712@kiit.ac.in',
    'thiyathiya088@gmail.com',
    '22052101@kiit.ac.in',
    'manveer7saggu@gmail.com',
    '33sorbojitmondal@gmail.com',
    'aarab.nishchal@gmail.com',
    'anthonyrozario62@gmail.com',
    '22052172@kiit.ac.in',
    '22054295@kiit.ac.in',
    'riyamalh75@gmail.com',
    '22052865@kiit.ac.in',
    '2205951@kiit.ac.in',
    'kumar.ayushx24@gmail.com',
    '100sumanghosh@gmail.com',
    '22051051@kiit.ac.in',
    '22051081@kiit.ac.in',
    'mridulagarwal20082004@gmail.com',
    'sahadribhattacharyya@gmail.com',
    '2229154@kiit.ac.in',
    '22054321@kiit.ac.in',
    'devlohani14251425@gmail.com',
    'sanand03072005@gmail.com',
    'ybhatter@scu.edu',
    '22051178@kiit.ac.in',
    'uddipta278@gmail.com',
    '2205840@kiit.ac.in',
    'omaasinha.99@gmail.com',
    'utkarshshah000@gmail.com',
    'rajpriyanshu1204@gmail.com',
    'roykaushik354@gmail.com',
    'sumitsaha.ps@gmail.com',
    'harshitbamotra.01@gmail.com',
    'varun.mohanta323@gmail.com',
    'dasayush483@gmail.com',
    'srik2301@gmail.com',
    'mauryapriyadarshi2004@gmail.com',
    '22051055@kiit.ac.in',
    '2470251@kiit.ac.in',
    'prasadyuvraj8805@gmail.com',
    'hansikachaudhary20@gmail.com',
    'aayushjamaiyar.19@gmail.com',
    '22051162@kiit.ac.in',
    'singhvishalk165@gmail.com',
    'soumyodeep89s@gmail.com',
    '22051621@kiit.ac.in',
    '22051027@kiit.ac.in',
    'kanishkjakhmola@gmail.com',
    'agrawalmohak988@gmail.com',
    '2205130@kiit.ac.in',
    'ashishsingh009876@gmail.com',
    'harshit.kr.singh.work@gmail.com',
    'devanshbajpai07@gmail.com',
    'kishalaylahiri@gmail.com',
    'pranjalbarnwaldev@gmail.com',
    'abhibratchandabunty@gmail.com',
    '22052576@kiit.ac.in',
    '2205697@kit.ac.in',
    '2205190@kiit.ac.in',
    '22052724@kiit.ac.in',
    'diptesh.bal@gmail.com',
    'vamshigodev@gmail.com',
    'rishikesh2747@gmail.com',
    '22052388@kiit.ac.in',
    '22052424@kiit.ac.in',
    'hranjan3246@gmail.com',
    '22052155@kiit.ac.in',
    '2206353@kiit.ac.in',
    '22051754@kiit.ac.in',
    'ayushmans012@gmail.com',
    'aryanv.india1@gmail.com',
    '22052633@kiit.ac.in',
    'krishsenpai7@gmail.com',
    '22051160@kiit.ac.in',
    'deepsikha1104@gmail.com',
    '22052471@kiit.ac.in',
    'sanjanabiswasiscute@gmail.com',
    '22052706@kiit.ac.in',
    'gkrcoder@gmail.com',
    '2205751@kiit.ac.in',
    '22053178@kiit.ac.in',
    'ayaanpattanayak54@gmail.com',
    'dripclade@gmail.com',
    'shubhamsahoo401@gmail.com',
    '22052485@kiit.ac.in',
    'adityabahadur294@gmail.com',
    'emma91zhang@gmail.com',
    '22052140@kiit.ac.in',
    'shritisadhu@gmail.com',
    '22052616@kiit.ac.in',
    'jared.werts@temple.edu',
    'mohamedimthiyas62696@gmail.com',
    '22051979@kiit.ac.in',
    '22051158@kiit.ac.in',
    '22052854@kiit.ac.in',
    'ananyaritu51@gmail.com',
    'shaswatjha12345@gmail.com',
    '2229132@kiit.ac.in',
    '2228053@kiit.ac.in',
    'yashsinhays20@gmail.com',
    'Roshan.kr.singh9857@gmail.com',
    'mdl.dhruba@gmail.com',
    'basetti.tulsi@gmail.com',
    '2230290@kiit.ac.in',
    '22052093@kiit.ac.in',
    'amazumdar41@gmail.com',
    'sarvanshmehta28@gmail.com',
    '2205292@kiit.ac.in',
    '22054363@kiit.ac.in',
    '2229035@kiit.ac.in',
    '22054406@kiit.ac.in',
    '22053244@kiit.ac.in',
    '2229061@kiit.ac.in',
    'anushaamar1111@gmail.com',
    '22053977@kiit.ac.in',
    '2206424@kiit.ac.in',
    'aditi22mehta22@gmail.com',
    'shafaqueakhtar43@gmail.com',
    '22053301@kiit.ac.in',
    '22051289@kiit.ac.in',
    '22052732@kiit.ac.in',
    'enesyilmaz5157@gmail.com',
    '22052842@kiit.ac.in',
    'nehabommireddy@gmail.com',
    'prakashaditya061@gmail.com',
    'singhaarka0@gmail.com',
    'monasrimohandoss@gmail.com',
    'samriddhi.singh1222@gmail.com',
    'nikhildwivedi42794@gmail.com',
    'vivekganeshs12@gmail.com',
    '2470359@kiit.ac.in',
    'debarjunpal134@gmail.com',
    '22051875@kiit.ac.in',
    'souvik1252@gmail.com',
    'bakshiankit1005@gmail.com',
    'che3zcake@gmail.com',
    '22053227@kiit.ac.in',
    'd.soumyadeepofficial@gmail.com',
    '22051328@kiit.ac.in',
    '2205732@kiit.ac.in',
    'amanraj1227@gmail.com',
    'swapnashree2020@gmail.com',
    'ramankumar7c@gmail.com',
    'devabdulx@gmail.com',
    '22052983@kiit.ac.in',
    'anjupathak9810@gmail.com',
    'maithilibprojects@gmail.com',
    'adyashaanayakk@gmail.com',
    '2470404@kiit.ac.in',
    'tanushreedutta298@gmail.com',
    'sukarnbharadwaj2022@gmail.com',
    'arpreet4114@gmail.com'
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
        Keploy - Automated Testing 101 Badge
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
              <div className=" text-orange-400 text-sm">★★★★</div>
              <img
                src="/assets/images/keploy-logo.png"
                alt="Keploy Logo"
                className="w-18 h-8 object-contain"
                crossOrigin="anonymous"
              />
              <p className="text-[16px] tracking-widest font-semibold text-gray-800 mt-0">
                API FELLOWSHIP
              </p>
              <h2 className="text-[18px] font-bold text-orange-600 my-1 mb-0">
                Automated Testing & CI/CD
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
