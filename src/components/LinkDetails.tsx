// "use client"

// import React, { useState, useEffect, useCallback } from 'react';
// import LeftDetails from './UserView';
// import RightDetails from './RightDetails';

// interface Link {
//   platform: string;
//   url: string;
// }

// const LinkDetails: React.FC = () => {
//   const [links, setLinks] = useState<Link[]>([]);

//   useEffect(() => {
//     const storedLinks = localStorage.getItem("links");
//     if (storedLinks) {
//       try {
//         const parsedLinks = JSON.parse(storedLinks);
//         if (Array.isArray(parsedLinks)) {
//           setLinks(parsedLinks);
//         } else {
//           console.error("Stored links is not an array");
//           setLinks([]);
//         }
//       } catch (error) {
//         console.error("Error parsing stored links", error);
//         setLinks([]);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("links", JSON.stringify(links));
//   }, [links]);

//   const handleSetLinks = useCallback((newLinksOrFunction: Link[] | ((prevLinks: Link[]) => Link[])) => {
//     console.log("handleSetLinks called with:", newLinksOrFunction);
//     setLinks(prevLinks => {
//       const newLinks = typeof newLinksOrFunction === 'function' 
//         ? newLinksOrFunction(prevLinks) 
//         : newLinksOrFunction;
//       console.log("New links state:", newLinks);
//       return newLinks;
//     });
//   }, []);

// };

// export default LinkDetails;