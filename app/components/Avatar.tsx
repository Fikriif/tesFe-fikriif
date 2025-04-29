type AvatarProps = {
  name: string | any;
};

const Avatar = ({ name }: AvatarProps) => {
  return (
    <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold">
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export default Avatar;
