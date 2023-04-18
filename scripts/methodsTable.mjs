export const methodsTable = metaArr =>
  // const accordionModule = modules[0]
  metaArr.map(component => ({
    tagName: component.tagName,
    methods: component.members.filter(member => member.kind === 'method' && member.privacy === 'public')
  }));

// metaArr.map(component => (
//   <>
//     ###{component.tagName}
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Description</th>
//         </tr>
//       </thead>
//       <tbody>
//         {component.members.map(member => {
//           if (member.kind === 'method' && member.privacy === 'public') {
//             return (
//               <tr>
//                 <td>{method.name}</td>
//                 <td>{method.description}</td>
//               </tr>
//             );
//           } else return
//         })}
//       </tbody>
//     </table>
//   </>
// ));
