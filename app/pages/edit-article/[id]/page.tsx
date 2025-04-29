// import React from 'react'

// const page = () => {
//     const [activePage, setActivePage] = React.useState("articles");
//     const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
//     const [articleId, setArticleId] = React.useState<number | null>(null);
//     const router = useRouter();

//     useEffect(() => {
//       if (articleId !== null) {
//         setActivePage("edit-article");
//       }
//     }, [articleId]);

//     const handleSetActivePage = (page: string, id?: number) => {
//       if (page === "logout") {
//         setIsLogoutModalOpen(true);
//       } else {
//         setActivePage(page);
//       }
//     };

//     const renderContent = () => {
//       switch (activePage) {
//         case "articles":
//           return (
//             <div>
//               <ArticlesAdmin setActivePage={handleSetActivePage} />
//             </div>
//           );
//         case "edit-article":
//           return (
//             <div>
//               {articleId ? <EditArticles articleId={articleId} /> : null}
//             </div>
//           );
//         case "category":
//           return <div>category</div>;
//         case "logout":
//           return <div>logout</div>;
//         default:
//           return null;
//       }
//     };

//     const handleConfirmLogout = () => {
//       setIsLogoutModalOpen(false);
//       localStorage.removeItem("token");
//       router.push("/");
//     };

//     const handleCancelLogout = () => {
//       setIsLogoutModalOpen(false);
//     };
//   return (
//     <div>
//       <div className="flex min-h-screen">
//         <div className="w-64 bg-blue-600 min-h-screen text-white">
//           <Sidebar setActivePage={handleSetActivePage} />
//         </div>

//         <div className="flex flex-col w-full">
//           <div className=" text-black border-b border-gray-300">
//             <TopBar titleTopBar="Article" />
//           </div>

//           <div className="flex-1 p-4">{renderContent()}</div>
//         </div>
//         {isLogoutModalOpen && (
//           <ModalLogout
//             userLogout={handleConfirmLogout}
//             cancelLogout={handleCancelLogout}
//             handleOutsideClick={() => setIsLogoutModalOpen(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default page
