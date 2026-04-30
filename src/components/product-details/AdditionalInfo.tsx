export default function AdditionalInfo({ additionalInfo }) {
  return (
    <section className="mt-10 mb-10" id="additionalinfo">
      <h2 className="mb-6 border-b pb-3 text-3xl font-bold text-gray-900">
        Additional Details
      </h2>
      <div className="grid grid-cols-2 gap-6 rounded-xl bg-white p-6 shadow-md sm:grid-cols-3">
        {Object.entries(additionalInfo).map(([key, value]) => (
          <div key={key}>
            <dt className="text-sm font-medium text-gray-500 capitalize">
              {key.replace(/([A-Z])/g, " $1")}:
            </dt>
            <dd className="text-base font-semibold text-gray-900">
              {String(value)}
            </dd>
          </div>
        ))}
      </div>
    </section>
  );
}
