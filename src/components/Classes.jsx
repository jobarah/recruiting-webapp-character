import Card from "./lib/Card";
import './Classes.css';

const Classes = ({ classList, onClick, eligibleClasses }) => {

  return (
    <Card title="Classes">
      {classList.map((classItem) => (
      <div
          key={classItem}
          onClick={() => onClick(classItem)}
          className={eligibleClasses.includes(classItem) ? 'eligible-class' : ''}
      >
          {classItem}
      </div>
      ))}
    </Card>
  );
}

export default Classes;