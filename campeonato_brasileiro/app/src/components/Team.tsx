interface ITeamProps {
  src: string;
  label: string;
}

export default function Team(props: ITeamProps) {
  const { src, label } = props;
  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      <img src={src} alt="team logo" />
      <label style={{ marginLeft: "1rem" }}>{label}</label>
    </span>
  );
}
