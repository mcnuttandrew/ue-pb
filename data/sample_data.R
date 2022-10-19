library(tidyverse)

df <- read_csv("age.csv")

# ward 29
ward29_df <- df %>% 
  rename(
    ward29_male = ward_29_male_pop,
    ward29_female = ward_29_female_pop,
  ) %>%
  dplyr::select(age, ward29_male, ward29_female) %>%
  pivot_longer(cols = c(ward29_male, ward29_female), names_to = c("ward", "sex"), values_to = "count", names_sep = "_")

ward29_df <- ward29_df %>% 
  group_by(age, ward, sex) %>%
  uncount(count)

# ward 35
ward35_df <- df %>% 
  rename(
    ward35_male = ward_35_male_pop,
    ward35_female = ward_35_female_pop,
  ) %>%
  dplyr::select(age, ward35_male, ward35_female) %>%
  pivot_longer(cols = c(ward35_male, ward35_female), names_to = c("ward", "sex"), values_to = "count", names_sep = "_")

ward35_df <- ward35_df %>% 
  group_by(age, ward, sex) %>%
  uncount(count)

# sample from the wards
ward29_sample <- ward29_df %>%
  sample_frac(0.05) # some percent of ward participating
ward35_sample <- ward35_df %>%
  sample_frac(0.05) 

# put the wards together
result <- rbind(ward29_sample, ward35_sample)

# reshape result to get counts
result <- result %>% # this is our sample
  group_by(age, ward, sex) %>%
  summarise(
    count = n()
  )

# TODO: we also want the input dataframe formatted the same



