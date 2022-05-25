import React from "react";

const StruggledSections = () => {
  return (
    <div>
      <h2 className="text-xl font-bold">Students Struggled</h2>
      <div className="grid grid-cols-10 mt-4 gap-4">
        <div className="col-span-6">
          <div className="my-2 h-fit px-4 py-2 border-2 border-red-300 rounded-xl">
            <div className="flex justify-between">
              <h4>Written Works</h4>
              <h4>Task No.</h4>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                <h4 className="text-lg font-bold">4,5,6</h4>
              </div>
              <div className="flex justify-between">
                <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                <h4 className="text-lg font-bold">4,5,6</h4>
              </div>
              <div className="flex justify-between">
                <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                <h4 className="text-lg font-bold">4,5,6</h4>
              </div>
            </div>
          </div>
          <div className="my-2 h-fit px-4 py-2 border-2 border-red-300 rounded-xl">
            <div className="flex justify-between">
              <h4>Performance Tasks</h4>
              <h4>Task No.</h4>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                <h4 className="text-lg font-bold">4,5,6</h4>
              </div>
              <div className="flex justify-between">
                <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                <h4 className="text-lg font-bold">4,5,6</h4>
              </div>
              <div className="flex justify-between">
                <h4 className="text-lg font-bold">Omskim Ignacio</h4>
                <h4 className="text-lg font-bold">4,5,6</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 my-2 h-fit px-4 py-2 border-2 border-green-300 rounded-xl">
          <div className="flex justify-between">
            <h4>Students Excelled</h4>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-bold">Omskim Ignacio</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StruggledSections;
