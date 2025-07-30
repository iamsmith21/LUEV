// function isAuthenticated(req, res, next) {
//   console.log("req.isAuthenticated():", req.isAuthenticated());
//   console.log("req.user:", req.user);
//   console.log("req.session:", req.session);
//   if (req.isAuthenticated()) return next();
//   return res.status(200).json({ message: "Unauthorized" });
// }
// module.exports = isAuthenticated;

function isAuthenticated(req, res, next) {
  console.log('=== STEP 3: Cart Access Debug ===');
  console.log('1. Request URL:', req.url);
  console.log('2. Request method:', req.method);
  console.log('3. Session ID:', req.sessionID);
  console.log('4. Cookie header:', req.headers.cookie);
  console.log('5. Session exists:', !!req.session);
  console.log('6. Session data:', JSON.stringify(req.session, null, 2));
  console.log('7. req.isAuthenticated():', req.isAuthenticated());
  console.log('8. req.user exists:', !!req.user);
  console.log('9. User details:', req.user ? { id: req.user.id, email: req.user.email } : 'No user');
  console.log('10. Client IP:', req.ip);
  console.log('11. Origin header:', req.get('Origin'));
  
  if (req.isAuthenticated()) {
    console.log('✅ Authentication successful for user:', req.user.id);
    console.log('========================');
    return next();
  } else {
    console.log('❌ Authentication failed - user not authenticated');
    console.log('========================');
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = isAuthenticated;