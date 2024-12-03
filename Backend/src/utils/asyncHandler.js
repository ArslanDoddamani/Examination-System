const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;

// const asyncHandler = function(requestHandler){
//     return function(req, res, next){
//         Promise.resolve(requestHandler(req,res,next)).catch(next);
//     }
// }
