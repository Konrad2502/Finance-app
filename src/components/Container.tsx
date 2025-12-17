import "./Conatiner.scss";

type containerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: containerProps) {
  return <div className="container">{children}</div>;
}
