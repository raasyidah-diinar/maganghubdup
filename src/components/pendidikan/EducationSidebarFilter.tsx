// "use client";

// import { ChevronDown } from "lucide-react";
// import { useState, useEffect } from "react";

// const EDUCATION_LEVELS = [
//   "Institusi Pendidikan & Tech",
//   "Institut Negeri",
//   "Perusahaan EdTech",
//   "Politeknik Negeri",
//   "Politeknik Swasta",
//   "Sekolah Menengah Kejuruan",
//   "Universitas Negeri",
//   "Universitas Swasta",
// ];

// // Data kecamatan berdasarkan kota
// const SUBDISTRICTS: Record<string, string[]> = {
//   "Malang": [
//     "Lowokwaru",
//     "Blimbing",
//     "Klojen",
//     "Kedungkandang",
//     "Sukun",
//   ],
//   "Jakarta Selatan": [
//     "Kebayoran Baru",
//     "Kebayoran Lama",
//     "Pesanggrahan",
//     "Cilandak",
//     "Pasar Minggu",
//     "Jagakarsa",
//     "Mampang Prapatan",
//     "Pancoran",
//     "Tebet",
//     "Setiabudi",
//   ],
//   "Surabaya": [
//     "Gubeng",
//     "Wonokromo",
//     "Tegalsari",
//     "Genteng",
//     "Rungkut",
//     "Sukolilo",
//     "Mulyorejo",
//   ],
//   "Bandung": [
//     "Bandung Wetan",
//     "Sumur Bandung",
//     "Cibeunying Kaler",
//     "Cibeunying Kidul",
//     "Coblong",
//     "Sukajadi",
//     "Cidadap",
//   ],
// };

// type Props = {
//   selectedCity?: string;
//   onSubdistrictsChange?: (subdistricts: string[]) => void;
//   onEducationLevelsChange?: (levels: string[]) => void;
// };

// export default function EducationSidebarFilter({ 
//   selectedCity, 
//   onSubdistrictsChange,
//   onEducationLevelsChange
// }: Props) {
//   const [open, setOpen] = useState({
//     level: true,
//     kecamatan: true,
//   });

//   const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
//   const [selectedSubdistricts, setSelectedSubdistricts] = useState<string[]>([]);

//   const toggle = (key: keyof typeof open) =>
//     setOpen({ ...open, [key]: !open[key] });

//   const toggleLevel = (level: string) => {
//     setSelectedLevels((prev) =>
//       prev.includes(level)
//         ? prev.filter((l) => l !== level)
//         : [...prev, level]
//     );
//   };

//   const toggleSubdistrict = (subdistrict: string) => {
//     setSelectedSubdistricts((prev) =>
//       prev.includes(subdistrict)
//         ? prev.filter((s) => s !== subdistrict)
//         : [...prev, subdistrict]
//     );
//   };

//   // Emit perubahan ke parent
//   useEffect(() => {
//     if (onSubdistrictsChange) {
//       onSubdistrictsChange(selectedSubdistricts);
//     }
//   }, [selectedSubdistricts, onSubdistrictsChange]);

//   useEffect(() => {
//     if (onEducationLevelsChange) {
//       onEducationLevelsChange(selectedLevels);
//     }
//   }, [selectedLevels, onEducationLevelsChange]);

//   const resetAll = () => {
//     setSelectedLevels([]);
//     setSelectedSubdistricts([]);
//   };

//   // Reset selected subdistricts ketika kota berubah
//   useEffect(() => {
//     setSelectedSubdistricts([]);
//   }, [selectedCity]);

//   // Ambil kecamatan berdasarkan kota yang dipilih
//   const availableSubdistricts = selectedCity ? SUBDISTRICTS[selectedCity] || [] : [];

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors">
//       <div className="p-4 space-y-6 text-sm">
        
//         {/* Tingkat Pendidikan */}
//         <div>
//           <button
//             onClick={() => toggle("level")}
//             className="w-full flex justify-between items-center font-semibold mb-3 text-gray-900 dark:text-gray-100"
//           >
//             <span>Tingkat Pendidikan</span>
//             <ChevronDown
//               size={16}
//               className={`transition-transform text-gray-600 dark:text-gray-400 ${
//                 open.level ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {open.level && (
//             <div className="space-y-2 text-gray-700 dark:text-gray-300 max-h-64 overflow-y-auto">
//               {EDUCATION_LEVELS.map((level) => (
//                 <label
//                   key={level}
//                   className="flex items-center gap-3 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedLevels.includes(level)}
//                     onChange={() => toggleLevel(level)}
//                     className="w-4 h-4 rounded border border-gray-400 dark:border-gray-500 accent-blue-500 dark:accent-blue-400"
//                   />
//                   {level}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         <hr className="dark:border-gray-700" />

//         {/* Kecamatan */}
//         <div>
//           <button
//             onClick={() => toggle("kecamatan")}
//             className="w-full flex justify-between items-center font-semibold mb-3 text-gray-900 dark:text-gray-100"
//           >
//             <span>Kecamatan</span>
//             <ChevronDown
//               size={16}
//               className={`transition-transform text-gray-600 dark:text-gray-400 ${
//                 open.kecamatan ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {open.kecamatan && (
//             <>
//               {availableSubdistricts.length > 0 ? (
//                 <div className="space-y-2 text-gray-700 dark:text-gray-300 max-h-48 overflow-y-auto">
//                   {availableSubdistricts.map((subdistrict) => (
//                     <label
//                       key={subdistrict}
//                       className="flex items-center gap-3 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={selectedSubdistricts.includes(subdistrict)}
//                         onChange={() => toggleSubdistrict(subdistrict)}
//                         className="w-4 h-4 rounded border border-gray-400 dark:border-gray-500 accent-blue-500 dark:accent-blue-400"
//                       />
//                       {subdistrict}
//                     </label>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="border border-dashed dark:border-gray-600 rounded-lg px-3 py-4 text-gray-500 dark:text-gray-400 text-center transition-colors">
//                   {selectedCity 
//                     ? `Tidak ada kecamatan untuk ${selectedCity}`
//                     : "Pilih Kota/Kabupaten di pencarian atas untuk melihat kecamatan."}
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Reset */}
//         <div className="pt-2">
//           <hr className="mb-4 border-gray-200 dark:border-gray-700" />
//           <div className="text-center">
//             <button
//               onClick={resetAll}
//               className="text-orange-500 dark:text-orange-400 text-sm font-medium hover:underline transition-colors"
//             >
//               Reset
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }