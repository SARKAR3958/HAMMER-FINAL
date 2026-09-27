import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PartItem, BRANDS_LIST } from '../data/partsData';
import { PreloadedImage } from './PreloadedImage';

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPart?: PartItem | null;
}

export const GetQuoteModal: React.FC<GetQuoteModalProps> = ({
  isOpen,
  onClose,
  selectedPart
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    brand: selectedPart ? selectedPart.brand : 'KOMATSU',
    partNumber: selectedPart ? selectedPart.partNumber : '',
    partName: selectedPart ? selectedPart.name : '',
    quantity: '1',
    urgency: 'Standard (1-3 Days)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedPart) {
      setFormData((prev) => ({
        ...prev,
        brand: selectedPart.brand,
        partNumber: selectedPart.partNumber,
        partName: selectedPart.name
      }));
    }
  }, [selectedPart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Card Spring Scale-In */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-[#0A2240] text-white p-5 flex items-center justify-between border-b border-blue-900">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#FFC000] text-black rounded-full flex items-center justify-center font-black shadow-sm">
                  <Send className="w-4 h-4 ml-0.5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold uppercase tracking-tight">Request Instant Part Quote</h3>
                  <p className="text-xs text-gray-300">Guaranteed Fast Response for Canadian & Global Fleets</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-blue-900/50 cursor-pointer transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {/* Direct Selected Part Summary Header if a part was selected */}
              {selectedPart && (
                <div className="bg-slate-50 border border-yellow-400/60 rounded-md p-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 w-full sm:w-auto">
                    <div className="w-16 h-16 rounded overflow-hidden shrink-0 border border-gray-300 bg-slate-950">
                      <PreloadedImage
                        src={selectedPart.imageUrl}
                        alt={selectedPart.name}
                        partId={selectedPart.id}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#0A2240] text-yellow-400 font-extrabold text-[9px] px-2 py-0.5 rounded uppercase">
                          {selectedPart.brand}
                        </span>
                        <span className="text-xs font-mono font-bold text-gray-900">
                          PN: {selectedPart.partNumber}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm text-gray-900 leading-tight">
                        {selectedPart.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-medium">
                        {selectedPart.machineModel} • <span className="text-green-700 font-bold">In Stock ({selectedPart.priceEstimate})</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-600 bg-white border border-gray-200 rounded px-2.5 py-1.5 shrink-0 hidden sm:block">
                    <div className="flex items-center gap-1 text-green-700 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-yellow-500" />
                      <span>OEM Spec Verified</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 mt-0.5">
                      <Truck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Express Freight Ready</span>
                    </div>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
                  <h4 className="text-2xl font-black text-gray-900">Quote Request Submitted!</h4>
                  <p className="text-xs text-gray-600 max-w-md mx-auto">
                    Thank you! Our heavy equipment part specialist will check current live inventory and respond with official wholesale pricing in less than 30 minutes.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                    setTimeout(() => {
                      setSubmitted(false);
                      onClose();
                    }, 2800);
                  }}
                  className="space-y-4 text-xs font-semibold"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Your Full Name <span className="text-yellow-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-yellow-500 font-normal"
                        placeholder="e.g. John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Email Address <span className="text-yellow-500">*</span></label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-yellow-500 font-normal"
                        placeholder="e.g. john@construction.ca"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Phone Number <span className="text-yellow-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-yellow-500 font-normal"
                        placeholder="+1 (431) 990-6055"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Company / Fleet Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:bg-white focus:outline-none font-normal"
                        placeholder="e.g. Heavy Earthworks Ltd"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Brand / OEM Manufacturer</label>
                      <select
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:bg-white focus:outline-none font-normal"
                      >
                        {BRANDS_LIST.map((b) => (
                          <option key={b.name} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Part Number</label>
                      <input
                        type="text"
                        value={formData.partNumber}
                        onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:bg-white focus:outline-none font-mono"
                        placeholder="e.g. 208-27-00120"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Quantity Needed</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:bg-white focus:outline-none font-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1">Delivery Urgency</label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:bg-white focus:outline-none font-normal"
                      >
                        <option>Immediate / Machine Down (Same Day Dispatch)</option>
                        <option>Standard (1-3 Days Delivery)</option>
                        <option>Stocking Order (Next Week)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Additional Part Details or Machine Serial #</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Provide machine serial number, dimensions or custom requests..."
                      className="w-full bg-gray-100 border border-gray-300 rounded p-2.5 focus:bg-white focus:outline-none font-normal"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 border border-gray-300 rounded font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Cancel
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="bg-[#0A2240] hover:bg-[#FFC000] hover:text-black text-white font-extrabold px-6 py-2 rounded uppercase tracking-wider transition-all cursor-pointer shadow-md"
                    >
                      Submit Quote Request
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
