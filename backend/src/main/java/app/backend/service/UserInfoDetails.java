package app.backend.service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import app.backend.entity.UserInfo;

public class UserInfoDetails implements UserDetails {

	private String username; // Changed from 'name' to 'username' for clarity
	private String password;
	private List<GrantedAuthority> authorities;

	public UserInfoDetails(UserInfo userInfo) {
		this.username = userInfo.getEmail(); // Assuming 'email' is used as 'username'
		this.password = userInfo.getPassword();
	    this.authorities = List.of(new SimpleGrantedAuthority(userInfo.getRole().name()));

	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true; // Implement your logic if you need this
	}

	@Override
	public boolean isAccountNonLocked() {
		return true; // Implement your logic if you need this
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true; // Implement your logic if you need this
	}

	@Override
	public boolean isEnabled() {
		return true; // Implement your logic if you need this
	}
}
