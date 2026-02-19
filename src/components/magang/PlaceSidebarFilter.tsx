// "use client";

// import { ChevronDown } from "lucide-react";
// import { useState, useEffect } from "react";

// const WORK_TYPE_OPTIONS = [
//   "Onsite",
//   "Hybrid",
//   "Remote",
// ];

// // Data kecamatan berdasarkan kota (sama seperti sebelumnya)
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
//   onWorkTypesChange?: (workTypes: string[]) => void;
// };

// export default function PlaceSidebarFilter({ 
//   selectedCity, 
//   onSubdistrictsChange,
//   onWorkTypesChange
// }: Props) {
//   const [open, setOpen] = useState({
//     bidang: true,
//     kecamatan: true,
//     workType: true,
//   });

//   const [bidang, setBidang] = useState("Semua Bidang");
//   const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);
//   const [selectedSubdistricts, setSelectedSubdistricts] = useState<string[]>([]);

//   const toggle = (key: keyof typeof open) =>
//     setOpen({ ...open, [key]: !open[key] });

//   const toggleWorkType = (type: string) => {
//     setSelectedWorkTypes((prev) =>
//       prev.includes(type)
//         ? prev.filter((t) => t !== type)
//         : [...prev, type]
//     );
//   };

//   const toggleSubdistrict = (subdistrict: string) => {
//     setSelectedSubdistricts((prev) => {
//       const newSubdistricts = prev.includes(subdistrict)
//         ? prev.filter((s) => s !== subdistrict)
//         : [...prev, subdistrict];
      
//       return newSubdistricts;
//     });
//   };

//   // Emit perubahan ke parent
//   useEffect(() => {
//     if (onSubdistrictsChange) {
//       onSubdistrictsChange(selectedSubdistricts);
//     }
//   }, [selectedSubdistricts, onSubdistrictsChange]);

//   useEffect(() => {
//     if (onWorkTypesChange) {
//       onWorkTypesChange(selectedWorkTypes);
//     }
//   }, [selectedWorkTypes, onWorkTypesChange]);

//   const resetAll = () => {
//     setBidang("Semua Bidang");
//     setSelectedWorkTypes([]);
//     setSelectedSubdistricts([]);
//   };

//   // Reset selected subdistricts ketika kota berubah
//   useEffect(() => {
//     setSelectedSubdistricts([]);
//   }, [selectedCity]);

//   // Ambil kecamatan berdasarkan kota yang dipilih
//   const availableSubdistricts = selectedCity ? SUBDISTRICTS[selectedCity] || [] : [];

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-6 text-sm transition-colors">

//       {/* Bidang Usaha */}
//       <div>
//         <button
//           onClick={() => toggle("bidang")}
//           className="w-full flex justify-between items-center font-semibold mb-2 text-gray-900 dark:text-gray-100"
//         >
//           <span>Bidang Usaha</span>
//           <ChevronDown
//             size={16}
//             className={`transition-transform text-gray-600 dark:text-gray-400 ${open.bidang ? "rotate-180" : ""}`}
//           />
//         </button>

//         {open.bidang && (
//           <select
//             value={bidang}
//             onChange={(e) => setBidang(e.target.value)}
//             className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
//           >
//             <option>Semua Bidang</option>
//             <option>Teknologi</option>
//             <option>E-Commerce</option>
//             <option>Pendidikan</option>
//             <option>Keuangan</option>
//           </select>
//         )}
//       </div>

//       <hr className="dark:border-gray-700" />

//       {/* Kecamatan */}
//       <div>
//         <button
//           onClick={() => toggle("kecamatan")}
//           className="w-full flex justify-between items-center font-semibold mb-2 text-gray-900 dark:text-gray-100"
//         >
//           <span>Kecamatan</span>
//           <ChevronDown
//             size={16}
//             className={`transition-transform text-gray-600 dark:text-gray-400 ${
//               open.kecamatan ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {open.kecamatan && (
//           <>
//             {availableSubdistricts.length > 0 ? (
//               <div className="space-y-2 text-gray-700 dark:text-gray-300 max-h-48 overflow-y-auto">
//                 {availableSubdistricts.map((subdistrict) => (
//                   <label
//                     key={subdistrict}
//                     className="flex items-center gap-3 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedSubdistricts.includes(subdistrict)}
//                       onChange={() => toggleSubdistrict(subdistrict)}
//                       className="w-4 h-4 rounded border border-gray-400 dark:border-gray-500 accent-blue-500 dark:accent-blue-400"
//                     />
//                     {subdistrict}
//                   </label>
//                 ))}
//               </div>
//             ) : (
//               <div className="border border-dashed dark:border-gray-600 rounded-lg px-3 py-4 text-gray-500 dark:text-gray-400 text-center transition-colors">
//                 {selectedCity 
//                   ? `Tidak ada kecamatan untuk ${selectedCity}`
//                   : "Pilih Kota/Kabupaten di pencarian atas untuk melihat kecamatan."}
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       <hr className="dark:border-gray-700" />

//       {/* Kebijakan Magang */}
//       <div>
//         <button
//           onClick={() => toggle("workType")}
//           className="w-full flex justify-between items-center font-semibold mb-2 text-gray-900 dark:text-gray-100"
//         >
//           <span>Kebijakan Magang</span>
//           <ChevronDown
//             size={16}
//             className={`transition-transform text-gray-600 dark:text-gray-400 ${
//               open.workType ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {open.workType && (
//           <>
//             <div className="space-y-2 text-gray-700 dark:text-gray-300">
//               {WORK_TYPE_OPTIONS.map((item) => (
//                 <label
//                   key={item}
//                   className="flex items-center gap-3 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedWorkTypes.includes(item)}
//                     onChange={() => toggleWorkType(item)}
//                     className="w-4 h-4 rounded border border-gray-400 dark:border-gray-500 accent-blue-500 dark:accent-blue-400"
//                   />
//                   {item}
//                 </label>
//               ))}
//             </div>

//             {/* Reset */}
//             <div className="mt-4">
//               <hr className="mb-3 border-gray-200 dark:border-gray-700" />
//               <div className="text-center">
//                 <button
//                   onClick={resetAll}
//                   className="text-orange-500 dark:text-orange-400 text-sm font-medium hover:underline transition-colors"
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }