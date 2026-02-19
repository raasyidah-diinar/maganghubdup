// "use client";

// import { ChevronDown } from "lucide-react";
// import { useState, useEffect } from "react";

// const POLICY_OPTIONS = [
//   "Magang di kantor (WFO)",
//   "Hybrid",
//   "Magang dari rumah (WFA)",
// ];

// const UPDATED_OPTIONS = [
//   "24 Jam Terakhir",
//   "Seminggu Terakhir",
//   "Sebulan Terakhir",
//   "Kapan pun",
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
//   onPoliciesChange?: (policies: string[]) => void;
//   onUpdatedChange?: (updated: string | null) => void;
// };

// export default function JobSidebarFilter({ 
//   selectedCity, 
//   onSubdistrictsChange,
//   onPoliciesChange,
//   onUpdatedChange
// }: Props) {
//   const [open, setOpen] = useState({
//     sort: true,
//     bidang: true,
//     kecamatan: true,
//     updated: true,
//     policy: true,
//   });

//   const [sortBy, setSortBy] = useState<"relevan" | "baru">("relevan");
//   const [bidang, setBidang] = useState("Semua Bidang");
//   const [updated, setUpdated] = useState<string | null>(null);
//   const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
//   const [selectedSubdistricts, setSelectedSubdistricts] = useState<string[]>([]);

//   const toggle = (key: keyof typeof open) =>
//     setOpen({ ...open, [key]: !open[key] });

//   const togglePolicy = (policy: string) => {
//     setSelectedPolicies((prev) =>
//       prev.includes(policy)
//         ? prev.filter((p) => p !== policy)
//         : [...prev, policy]
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

//   // Emit perubahan ke parent menggunakan useEffect
//   useEffect(() => {
//     if (onSubdistrictsChange) {
//       onSubdistrictsChange(selectedSubdistricts);
//     }
//   }, [selectedSubdistricts, onSubdistrictsChange]);

//   // Emit perubahan policies ke parent
//   useEffect(() => {
//     if (onPoliciesChange) {
//       onPoliciesChange(selectedPolicies);
//     }
//   }, [selectedPolicies, onPoliciesChange]);

//   // Emit perubahan updated ke parent
//   useEffect(() => {
//     if (onUpdatedChange) {
//       onUpdatedChange(updated);
//     }
//   }, [updated, onUpdatedChange]);

//   const resetAll = () => {
//     setSortBy("relevan");
//     setBidang("Semua Bidang");
//     setUpdated(null);
//     setSelectedPolicies([]);
//     setSelectedSubdistricts([]);
//   };

//   // Reset selected subdistricts ketika kota berubah
//   useEffect(() => {
//     setSelectedSubdistricts([]);
//   }, [selectedCity]);

//   // Ambil kecamatan berdasarkan kota yang dipilih
//   const availableSubdistricts = selectedCity ? SUBDISTRICTS[selectedCity] || [] : [];

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-6 text-sm transition-colors h-fit">

//       {/* Urutkan */}
//       <div>
//         <button
//           onClick={() => toggle("sort")}
//           className="w-full flex justify-between items-center font-semibold mb-3 text-gray-900 dark:text-gray-100"
//         >
//           <span>Urutkan</span>
//           <ChevronDown
//             size={16}
//             className={`transition-transform text-gray-600 dark:text-gray-400 ${open.sort ? "rotate-180" : ""}`}
//           />
//         </button>

//         {open.sort && (
//           <div className="flex flex-col gap-2">
//             <button
//               onClick={() => setSortBy("relevan")}
//               className={`rounded-full px-4 py-1 w-fit border transition-colors ${
//                 sortBy === "relevan"
//                   ? "border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400"
//                   : "border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400"
//               }`}
//             >
//               Paling Relevan
//             </button>

//             <button
//               onClick={() => setSortBy("baru")}
//               className={`rounded-full px-4 py-1 w-fit border transition-colors ${
//                 sortBy === "baru"
//                   ? "border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400"
//                   : "border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400"
//               }`}
//             >
//               Baru Ditambahkan
//             </button>
//           </div>
//         )}
//       </div>

//       <hr className="dark:border-gray-700" />

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

//       {/* Terakhir Diperbarui */}
//       <div>
//         <button
//           onClick={() => toggle("updated")}
//           className="w-full flex justify-between items-center font-semibold mb-2 text-gray-900 dark:text-gray-100"
//         >
//           <span>Terakhir Diperbarui</span>
//           <ChevronDown
//             size={16}
//             className={`transition-transform text-gray-600 dark:text-gray-400 ${
//               open.updated ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {open.updated && (
//           <div className="space-y-2 text-gray-700 dark:text-gray-300">
//             {UPDATED_OPTIONS.map((item) => (
//               <label
//                 key={item}
//                 className="flex items-center gap-3 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
//               >
//                 <input
//                   type="radio"
//                   name="updated"
//                   checked={updated === item}
//                   onChange={() => setUpdated(item)}
//                   className="accent-blue-500 dark:accent-blue-400"
//                 />
//                 {item}
//               </label>
//             ))}
//           </div>
//         )}
//       </div>

//       <hr className="dark:border-gray-700" />

//       {/* Kebijakan Magang */}
//       <div>
//         <button
//           onClick={() => toggle("policy")}
//           className="w-full flex justify-between items-center font-semibold mb-2 text-gray-900 dark:text-gray-100"
//         >
//           <span>Kebijakan Magang</span>
//           <ChevronDown
//             size={16}
//             className={`transition-transform text-gray-600 dark:text-gray-400 ${
//               open.policy ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {open.policy && (
//           <>
//             <div className="space-y-2 text-gray-700 dark:text-gray-300">
//               {POLICY_OPTIONS.map((item) => (
//                 <label
//                   key={item}
//                   className="flex items-center gap-3 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedPolicies.includes(item)}
//                     onChange={() => togglePolicy(item)}
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