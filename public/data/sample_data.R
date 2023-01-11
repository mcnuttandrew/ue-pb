# Clean environment
rm(list=ls())

# Load library
library(tidyverse)

#(1) REFORMAT AGE DATA FROM WIDE TO LONG

# Load age data
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

# ward 36
ward36_df <- df %>% 
  rename(
    ward36_male = ward_36_male_pop,
    ward36_female = ward_36_female_pop,
  ) %>%
  dplyr::select(age, ward36_male, ward36_female) %>%
  pivot_longer(cols = c(ward36_male, ward36_female), names_to = c("ward", "sex"), values_to = "count", names_sep = "_")

ward36_df <- ward36_df %>% 
  group_by(age, ward, sex) %>%
  uncount(count)

# ward 49
ward49_df <- df %>% 
  rename(
    ward49_male = ward_49_male_pop,
    ward49_female = ward_49_female_pop,
  ) %>%
  dplyr::select(age, ward49_male, ward49_female) %>%
  pivot_longer(cols = c(ward49_male, ward49_female), names_to = c("ward", "sex"), values_to = "count", names_sep = "_")

ward49_df <- ward49_df %>% 
  group_by(age, ward, sex) %>%
  uncount(count)


# sample from the wards
ward29_sample <- ward29_df %>%
  sample_frac(0.05) # some percent of ward participating

ward35_sample <- ward35_df %>%
  sample_frac(0.06) 

ward36_sample <- ward35_df %>%
  sample_frac(0.05) 

ward49_sample <- ward35_df %>%
  sample_frac(0.07) 

# put the sampled wards together
age_sample <- rbind(ward29_sample, ward35_sample, ward36_sample, ward49_sample)

# reshape result to get counts
age_sample <- age_sample %>% # this is our sample
  group_by(age, ward, sex) %>%
  summarise(
    count = n()
  )

# Format age dataframe to long format
age <- rbind(ward29_df, ward35_df, ward36_df, ward49_df)

age <- age %>% 
  group_by(age, ward, sex) %>%
  summarise(
    count = n()
  )


# Export dataframe as csv file
write.csv(age,"~/Desktop/Data Cognition Lab/ue-pb/data/clean_data/age_total.csv", row.names = TRUE)
write.csv(age_sample,"~/Desktop/Data Cognition Lab/ue-pb/data/clean_data/age_sample.csv", row.names = TRUE)



#(2) REFORMAT EDUCATION DATA FROM WIDE TO LONG
# Clean environment
rm(list=ls())

# Load education data
df2 <- read_csv("educ.csv")

# ward 29
ward29_df2 <- df2 %>% 
  dplyr::select(education, ward_29_educ) %>%
  pivot_longer(cols = c(ward_29_educ), names_to = c("ward"), values_to = "count")

ward29_df2 <- ward29_df2 %>% 
  group_by(education, ward) %>%
  uncount(count)

# ward 35
ward35_df2 <- df2 %>% 
  dplyr::select(education, ward_35_educ) %>%
  pivot_longer(cols = c(ward_35_educ), names_to = c("ward"), values_to = "count")

ward35_df2 <- ward35_df2 %>% 
  group_by(education, ward) %>%
  uncount(count)

# ward 36
ward36_df2 <- df2 %>% 
  dplyr::select(education, ward_36_educ) %>%
  pivot_longer(cols = c(ward_36_educ), names_to = c("ward"), values_to = "count")

ward36_df2 <- ward36_df2 %>% 
  group_by(education, ward) %>%
  uncount(count)

# ward 49
ward49_df2 <- df2 %>% 
  dplyr::select(education, ward_49_educ) %>%
  pivot_longer(cols = c(ward_49_educ), names_to = c("ward"), values_to = "count")

ward49_df2 <- ward49_df2 %>% 
  group_by(education, ward) %>%
  uncount(count)


# sample from the wards
ward29_sample <- ward29_df2 %>%
  sample_frac(0.05) # some percent of ward participating

ward35_sample <- ward35_df2 %>%
  sample_frac(0.06) 

ward36_sample <- ward35_df2 %>%
  sample_frac(0.05) 

ward49_sample <- ward35_df2 %>%
  sample_frac(0.07) 

# put the sampled wards together
educ_sample <- rbind(ward29_sample, ward35_sample, ward36_sample, ward49_sample)

# reshape result to get counts
educ_sample <- educ_sample %>% # this is our sample
  group_by(education, ward) %>%
  summarise(
    count = n()
  )

# Format age dataframe to long format
educ <- rbind(ward29_df2, ward35_df2, ward36_df2, ward49_df2)

educ <- educ %>% 
  group_by(education, ward) %>%
  summarise(
    count = n()
  )

# Export dataframe as csv file
write.csv(educ,"~/Desktop/Data Cognition Lab/ue-pb/data/clean_data/educ_total.csv", row.names = TRUE)
write.csv(educ_sample,"~/Desktop/Data Cognition Lab/ue-pb/data/clean_data/educ_sample.csv", row.names = TRUE)


#(3) REFORMAT INCOME DATA FROM WIDE TO LONG
# Clean environment
rm(list=ls())

# Load education data
df3 <- read_csv("income_cohort.csv")

# ward 29
ward29_df3 <- df3 %>% 
  dplyr::select(income_cohort, ward_29_income) %>%
  pivot_longer(cols = c(ward_29_income), names_to = c("ward"), values_to = "count")

ward29_df3 <- ward29_df3 %>% 
  group_by(income_cohort, ward) %>%
  uncount(count)

# ward 35
ward35_df3 <- df3 %>% 
  dplyr::select(income_cohort, ward_35_income) %>%
  pivot_longer(cols = c(ward_35_income), names_to = c("ward"), values_to = "count")

ward35_df3 <- ward35_df3 %>% 
  group_by(income_cohort, ward) %>%
  uncount(count)

# ward 36
ward36_df3 <- df3 %>% 
  dplyr::select(income_cohort, ward_36_income) %>%
  pivot_longer(cols = c(ward_36_income), names_to = c("ward"), values_to = "count")

ward36_df3 <- ward36_df3 %>% 
  group_by(income_cohort, ward) %>%
  uncount(count)

# ward 49
ward49_df3 <- df3 %>% 
  dplyr::select(income_cohort, ward_49_income) %>%
  pivot_longer(cols = c(ward_49_income), names_to = c("ward"), values_to = "count")

ward49_df3 <- ward49_df3 %>% 
  group_by(income_cohort, ward) %>%
  uncount(count)


# sample from the wards
ward29_sample <- ward29_df3 %>%
  sample_frac(0.05) # some percent of ward participating

ward35_sample <- ward35_df3 %>%
  sample_frac(0.06) 

ward36_sample <- ward35_df3 %>%
  sample_frac(0.05) 

ward49_sample <- ward35_df3 %>%
  sample_frac(0.07) 

# put the sampled wards together
income_sample <- rbind(ward29_sample, ward35_sample, ward36_sample, ward49_sample)

# reshape result to get counts
income_sample <- income_sample %>% # this is our sample
  group_by(income_cohort, ward) %>%
  summarise(
    count = n()
  )

# Format income dataframe to long format
income <- rbind(ward29_df3, ward35_df3, ward36_df3, ward49_df3)

income <- income %>% 
  group_by(income_cohort, ward) %>%
  summarise(
    count = n()
  )


# Export dataframe as csv file
write.csv(income,"~/Desktop/Data Cognition Lab/ue-pb/data/clean_data/income_total.csv", row.names = TRUE)
write.csv(income_sample,"~/Desktop/Data Cognition Lab/ue-pb/data/clean_data/income_sample.csv", row.names = TRUE)



#(4) REFORMAT POVERTY DATA FROM WIDE TO LONG
# Clean environment
rm(list=ls())

# Load education data
df4 <- read_csv("poverty.csv")

# ward 29
ward29_df4 <- df4 %>% 
  dplyr::select(below_poverty, ward_29) %>%
  pivot_longer(cols = c(ward_29), names_to = c("ward"), values_to = "count")

ward29_df4 <- ward29_df4 %>% 
  group_by(below_poverty, ward) %>%
  uncount(count)

# ward 35
ward35_df4 <- df4 %>% 
  dplyr::select(below_poverty, ward_35) %>%
  pivot_longer(cols = c(ward_35), names_to = c("ward"), values_to = "count")

ward35_df4 <- ward35_df4 %>% 
  group_by(below_poverty, ward) %>%
  uncount(count)

# ward 36
ward36_df4 <- df4 %>% 
  dplyr::select(below_poverty, ward_36) %>%
  pivot_longer(cols = c(ward_36), names_to = c("ward"), values_to = "count")

ward36_df4 <- ward36_df4 %>% 
  group_by(below_poverty, ward) %>%
  uncount(count)

# ward 49
ward49_df4 <- df4 %>% 
  dplyr::select(below_poverty, ward_49) %>%
  pivot_longer(cols = c(ward_49), names_to = c("ward"), values_to = "count")

ward49_df4 <- ward49_df4 %>% 
  group_by(below_poverty, ward) %>%
  uncount(count)


# sample from the wards
ward29_sample <- ward29_df4 %>%
  sample_frac(0.05) 

ward35_sample <- ward35_df4 %>%
  sample_frac(0.06) 

ward36_sample <- ward35_df4 %>%
  sample_frac(0.05) 

ward49_sample <- ward35_df4 %>%
  sample_frac(0.07) 

# put the sampled wards together
poverty_sample <- rbind(ward29_sample, ward35_sample, ward36_sample, ward49_sample)

# reshape result to get counts
poverty_sample <- poverty_sample %>% # this is our sample
  group_by(below_poverty, ward) %>%
  summarise(
    count = n()
  )

# Format age dataframe to long format
poverty <- rbind(ward29_df4, ward35_df4, ward36_df4, ward49_df4)

poverty <- poverty %>% 
  group_by(below_poverty, ward) %>%
  summarise(
    count = n()
  )

# Export dataframe as csv file
write.csv(poverty,"~/Desktop/Data Cognition Lab/ue-pb/data/clean_data/poverty_total.csv", row.names = TRUE)
write.csv(poverty_sample,"~/Desktop/Data Cognition Lab/ue-pb/data/clean_data/poverty_sample.csv", row.names = TRUE)


#(5) REFORMAT RACE DATA FROM WIDE TO LONG
# Clean environment
rm(list=ls())

# Load education data
df5 <- read_csv("race.csv")

# ward 29
ward29_df5 <- df5 %>% 
  dplyr::select(race_ethnicity, ward_29_race) %>%
  pivot_longer(cols = c(ward_29_race), names_to = c("ward"), values_to = "count")

ward29_df5 <- ward29_df5 %>% 
  group_by(race_ethnicity, ward) %>%
  uncount(count)

# ward 35
ward35_df5 <- df5 %>% 
  dplyr::select(race_ethnicity, ward_35_race) %>%
  pivot_longer(cols = c(ward_35_race), names_to = c("ward"), values_to = "count")

ward35_df5 <- ward35_df5 %>% 
  group_by(race_ethnicity, ward) %>%
  uncount(count)

# ward 36
ward36_df5 <- df5 %>% 
  dplyr::select(race_ethnicity, ward_36_race) %>%
  pivot_longer(cols = c(ward_36_race), names_to = c("ward"), values_to = "count")

ward36_df5 <- ward36_df5 %>% 
  group_by(race_ethnicity, ward) %>%
  uncount(count)

# ward 49
ward49_df5 <- df5 %>% 
  dplyr::select(race_ethnicity, ward_49_race) %>%
  pivot_longer(cols = c(ward_49_race), names_to = c("ward"), values_to = "count")

ward49_df5 <- ward49_df5 %>% 
  group_by(race_ethnicity, ward) %>%
  uncount(count)


# sample from the wards
ward29_sample <- ward29_df5 %>%
  sample_frac(0.05) 

ward35_sample <- ward35_df5 %>%
  sample_frac(0.06) 

ward36_sample <- ward35_df5 %>%
  sample_frac(0.05) 

ward49_sample <- ward35_df5 %>%
  sample_frac(0.07) 

# put the sampled wards together
race_sample <- rbind(ward29_sample, ward35_sample, ward36_sample, ward49_sample)

# reshape result to get counts
race_sample <- race_sample %>% # this is our sample
  group_by(race_ethnicity, ward) %>%
  summarise(
    count = n()
  )

# Format age dataframe to long format
race <- rbind(ward29_df5, ward35_df5, ward36_df5, ward49_df5)

race <- race %>% 
  group_by(race_ethnicity, ward) %>%
  summarise(
    count = n()
  )

# Export dataframe as csv file
write.csv(race,"~/Desktop/Data Cognition Lab/ue-pb/data/clean_data/race_total.csv", row.names = TRUE)
write.csv(race_sample,"~/Desktop/Data Cognition Lab/ue-pb/data/clean_data/race_sample.csv", row.names = TRUE)

