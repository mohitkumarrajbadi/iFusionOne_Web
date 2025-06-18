// type JsonPropertyData = {
//     propertyName: string;
//     propertyType: string;
//     propertyValue: any;
//     //   isExpandable: boolean;
//     //   expanded: boolean;
//     //   toggle?: () => void;
//   }

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { JsonNodeData } from "../useJsonGraph";
import "./App.css";

type JsonNode = Node<JsonNodeData>;

const JsonNode = ({ data, id }: NodeProps<JsonNode>) => {
 
  return (
    <div className="json-node" onClick={()=> data.onToggle?.(id)}>
      <Handle type="target" position={Position.Left} />

      {data.objProperties.map((property, index) => (
        <div key={index} className="json-property">
          <div className="json-property-header">
            <span className="property-name" >{property.propertyName}</span>
            <span className="property-type">{property.propertyType}</span>
          </div>

          <span className="property-value">{property.children?.length === 0 && property.propertyValue}</span>
          {property.children?.length!==0 && (
            <Handle type="source" position={Position.Right} id={String(index)} />
          )}
        </div>
      ))}
      {data.objProperties.length === 0 && <div className="json-empty">No properties</div>}
    </div>
  );
};

export default JsonNode;
