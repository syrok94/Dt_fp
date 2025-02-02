package app.backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import app.backend.dto.ResponseDTO;
import app.backend.dto.UserDTO;
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
    public ResponseEntity<ResponseDTO> addNewUser(@RequestBody UserInfo userInfo) {
        ResponseDTO response = new ResponseDTO();
        response.setMessage(service.addUser(userInfo));
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
    @PreAuthorize("hasAnyAuthority('DEVELOPER', 'ADMIN')")
    public ResponseEntity<UserDTO> getUser(@AuthenticationPrincipal UserDetails details) {
    	return ResponseEntity.status(HttpStatus.OK).body(service.getUser(details.getUsername()));
    			
    }
    
    @GetMapping("/getAllUser")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUser() {
    	return ResponseEntity.status(HttpStatus.OK).body(service.getAllUsers());
    }
    
    @DeleteMapping("/removeUser/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseDTO> removeUser(@PathVariable UUID userId) {
    	ResponseDTO response = new ResponseDTO();
    	response.setMessage(service.removeUser(userId));
    	return ResponseEntity.status(HttpStatus.OK).body(response);
    } 
    
    @PatchMapping("/updateUser/{userId}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable UUID userId, @RequestBody UserDTO dtoUser) {
    	return ResponseEntity.status(HttpStatus.OK).body(service.updateUser(userId, dtoUser));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(@RequestHeader("Authorization") String authHeader){
        if(authHeader == null ||  !authHeader.startsWith("Bearer ")){
            return ResponseEntity.badRequest().body("Invalidate Token");
        }

        String token = authHeader.substring(7);
        jwtService.invalidateToken(token);
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok("Logged Out Successfully");

    }


}
