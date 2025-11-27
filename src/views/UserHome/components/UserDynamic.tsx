export default function UserDynamic({ userDynamic }) {
  return (
    <div className="text-white h-full bg-red h-full">
      <div>
        <img
          className="w-200px"
          src={userDynamic?.events[0]?.pics[0]?.originUrl}
        />
      </div>
    </div>
  )
}
