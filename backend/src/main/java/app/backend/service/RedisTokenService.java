package app.backend.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;

@Service
public class RedisTokenService {

    private final StringRedisTemplate redisTemplate;

    public RedisTokenService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    //Store token in Redis with expiration time
    public void storeToken(String token, long expirationMillis) {
        redisTemplate.opsForValue().set(token, "blacklisted", expirationMillis, TimeUnit.MILLISECONDS);
    }

    //Check if token is blacklisted
    public boolean isTokenBlacklisted(String token) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(token));
    }
}
