package app.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.backend.entity.AccessToken;
import app.backend.entity.AuthRequest;
import app.backend.entity.UserInfo;
import app.backend.repository.UserInfoRepository;
import app.backend.service.JwtService;
import app.backend.service.UserInfoService;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/auth")
public class UserController {
	@Autowired
	private UserInfoRepository userRepo;

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public ResponseEntity<String> welcome() {
        return ResponseEntity.status(HttpStatus.OK).body("Welcome, this endpoint is not secure");
    }

    @PostMapping("/signup")
    public ResponseEntity<String> addNewUser(@RequestBody UserInfo userInfo) {
        String response = service.addUser(userInfo);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/user/userProfile")
    @PreAuthorize("hasAnyAuthority('DEVELOPER', 'ADMIN')")
    public ResponseEntity<String> userProfile() {
        return ResponseEntity.status(HttpStatus.OK).body("Welcome to User Profile");
    }

    @GetMapping("/admin/adminProfile")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> adminProfile() {
        return ResponseEntity.status(HttpStatus.OK).body("Welcome to Admin Profile");
    }

    @PostMapping("/login")
    public ResponseEntity<AccessToken> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(authRequest.getEmail());
        	AccessToken accessToken  = new AccessToken();
            accessToken.setAccessToken(token);
            return ResponseEntity.status(HttpStatus.OK).body(accessToken);
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
    
    @GetMapping("/getUser")
    public ResponseEntity<UserInfo> getUser(@AuthenticationPrincipal UserDetails details) {
    	Optional<UserInfo> optUser= userRepo.findByEmail(details.getUsername());
    	UserInfo user = new UserInfo();
    	if(optUser.isPresent()) {
    		user = optUser.get();
    	}
    	return ResponseEntity.status(HttpStatus.OK).body(user);
    			
    }
    
}
