import Card from "./lib/Card";

const Requirements = ({ selectedClass, classSet, onClick }) => {
  return (
    <Card title={`${selectedClass} minumum Requirements`}>
      {
        Object.keys(classSet[selectedClass]).map((attribute) => (
          <div key={attribute}>
            {attribute}: {classSet[selectedClass][attribute]}
          </div>
        ))
      }
      <button onClick={onClick}>Close Requirement View</button>
    </Card>
  );
};

export default Requirements;