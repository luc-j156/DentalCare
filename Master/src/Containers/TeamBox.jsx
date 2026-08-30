import React from "react";
import { Stethoscope, CheckCircle2, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const TeamBox = ({ prod }) => {
  if (!prod || prod.length === 0) {
    return (
      <div className="col-span-full py-12 text-center text-slate-500">
        <Stethoscope className="mx-auto h-12 w-12 text-slate-400 mb-3" />
        <p className="text-base font-semibold">No doctors listed yet.</p>
      </div>
    );
  }

  return (
    <>
      {prod.map((item, i) => {
        const imageUrl = item.Image
          ? `http://localhost:5000/${item.Image}`
          : require("../Assets/img/team-1.jpg");

        return (
          <div
            key={item.id || i}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Doctor Image */}
            <div className="relative h-72 w-full overflow-hidden bg-slate-100">
              <img
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                src={imageUrl}
                alt={item.FirstName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = require("../Assets/img/team-1.jpg");
                }}
              />
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                {item.status || "Available"}
              </span>
            </div>

            {/* Doctor Details */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  Dr. {item.FirstName}
                </h3>
                <p className="mt-1 inline-block rounded-lg bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
                  {item.Specialist || "Dental Specialist"}
                </p>
                {item.Number && (
                  <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span>{item.Number}</span>
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">License: {item.licencenumber || "Certified"}</span>
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-700 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Book</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TeamBox;
