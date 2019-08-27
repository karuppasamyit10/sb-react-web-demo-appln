package com.example.securityservers;

import java.security.KeyPair;
import java.util.Arrays;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.SessionAttributes;


/**
 * @author Karuppasamy Mariappan
 * @created 24-Aug-2019
 */
@Configuration
@SessionAttributes("authorizationRequest")
public class AuthServer {
	
	private static final Logger logger = LoggerFactory.getLogger(AuthServer.class);
	
	@Autowired
	private ServletContext servletContext;
	
	@Configuration
	@Order(-20)
	protected class LoginConfig extends WebSecurityConfigurerAdapter {
		@Override
		@Bean
		public AuthenticationManager authenticationManagerBean() throws Exception {
			return super.authenticationManagerBean();
		}

		@Override
		protected void configure(HttpSecurity http) throws Exception {
			String contextPath = servletContext.getContextPath();
			http.formLogin()
					.and().authorizeRequests().antMatchers(HttpMethod.OPTIONS,contextPath+"/oauth/token").permitAll().and()
					.requestMatchers().antMatchers(HttpMethod.OPTIONS,contextPath+"/login", contextPath+"/oauth/authorize", contextPath+"/oauth/confirm_access").and()
					.authorizeRequests().anyRequest().authenticated().and()
				.csrf()
					.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
		}

		@Autowired
		AuthenticationProvider customAuthenticationProvider;

		@Override
		public void configure(AuthenticationManagerBuilder auth) throws Exception {
			logger.info("*************************Auther Server Started*****************************");
			auth.authenticationProvider(customAuthenticationProvider).authenticationProvider(customAuthenticationProvider);
		}

	}

	@Configuration
	@EnableAuthorizationServer
	protected class OAuth2AuthorizationConfig extends AuthorizationServerConfigurerAdapter {

		@Autowired
		private AuthenticationManager authenticationManager;
		
		@Autowired
	    private TokenStore tokenStore;
		
		@Autowired
	    private CustomTokenEnhancer customTokenEnhancer;

	
		@Bean
		public JwtAccessTokenConverter jwtAccessTokenConverter() {
			JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
			KeyPair keyPair = new KeyStoreKeyFactory(new ClassPathResource("keystore.jks"), "example".toCharArray()).getKeyPair("example");
			converter.setKeyPair(keyPair);
			return converter;
		}

		@Bean
	    public TokenStore tokenStore() {
	        return new JwtTokenStore(jwtAccessTokenConverter());
	    }
		
		@Bean
	    @Primary
	    //Making this primary to avoid any accidental duplication with another token service instance of the same name
	    public DefaultTokenServices tokenServices() {
	        DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
	        defaultTokenServices.setTokenStore(tokenStore());
	        defaultTokenServices.setSupportRefreshToken(true);
	        return defaultTokenServices;
	    }
		 
		@Override
		public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
			clients.inMemory()
			.withClient("sb-demo")
			.secret("sb-demo-secret").autoApprove(true)
			.authorizedGrantTypes("client_credentials","authorization_code", "refresh_token", "password")
			.scopes("openid").accessTokenValiditySeconds(36000);
		}

		@Override
		public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
			TokenEnhancerChain enhancerChain = new TokenEnhancerChain();
		    enhancerChain.setTokenEnhancers(Arrays.asList(customTokenEnhancer, jwtAccessTokenConverter()));

		    endpoints.tokenStore(tokenStore)
		            .tokenEnhancer(enhancerChain)
		            .authenticationManager(authenticationManager).accessTokenConverter(jwtAccessTokenConverter());
		    
//		    endpoints.authenticationManager(authenticationManager).accessTokenConverter(jwtAccessTokenConverter());
//					.userDetailsService(customAuthenticationProvider);
		}

		@Override
		public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
			oauthServer.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()");
		}
	}
}