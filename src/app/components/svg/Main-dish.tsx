export default function MainDish({ className = "w-1/2 h-1/2" }: { className?: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        className={`${className} transition-colors duration-200 hover:text-white`}
        version="1.1"
        id="_x32_"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        preserveAspectRatio="xMidYMid meet"
        xmlSpace="preserve"
        fill="currentColor"
        stroke="currentColor"
      >
        <g>
          <path d="M476.554,371.269H35.446C15.87,371.269,0,387.138,0,406.716c0,19.577,15.87,35.446,35.446,35.446h441.108 c19.577,0,35.446-15.869,35.446-35.446C512,387.138,496.131,371.269,476.554,371.269z" />
          <path d="M278.716,133.777c8.1-6.623,13.384-16.561,13.384-27.838c0-19.938-16.161-36.1-36.1-36.1 c-19.938,0-36.1,16.162-36.1,36.1c0,11.277,5.285,21.216,13.384,27.838c-108.954,11.354-193.9,103.47-193.9,215.423h433.231 C472.616,237.247,387.669,145.131,278.716,133.777z M164.908,313.754H94.523c0-70.668,53.2-128.822,121.716-136.823 L164.908,313.754z" />
        </g>
      </svg>
    </div>
  );
}