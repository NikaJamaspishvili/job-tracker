const Goal = ({date,goal,sent,radius_,stroke_}:{date:string,goal:number,sent:number,radius_?:number,stroke_?:number}) => {
    const radius = radius_ || 60;
    const stroke = stroke_ || 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = Math.min(Math.max(sent, 0), Number(goal)) / Number(goal);
  
    const strokeDashoffset = circumference * (1 - progress);

  return (
    <section className="flex flex-col gap-5 items-center justify-center w-full">
    <div className="relative w-fit">
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <label>2</label>
      <circle
        stroke="red"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
    </svg>
    <label className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{sent}</label>
    </div>
    <h1 className="text-lg"><span className="font-bold">{sent}/{goal}</span> Applications sent <span className="font-bold text-blue-900">{date}</span></h1>
    {sent >= goal && <h1>Your goal has been achieved ✅</h1>}
    </section>
  )
}

export default Goal;
